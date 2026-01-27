const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const os = require('os');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers

// 1. Select Directory
ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    return result.canceled ? null : result.filePaths[0];
});

// 2. Save File
ipcMain.handle('save-file', async (event, { directory, filename, content }) => {
    try {
        // Defensive: Validate inputs
        if (!directory || typeof directory !== 'string') {
            throw new Error('Invalid directory path provided');
        }
        if (!filename || typeof filename !== 'string') {
            throw new Error('Invalid filename provided');
        }
        if (content === undefined || content === null) {
            throw new Error('No content provided');
        }

        // Defensive: Sanitize filename to prevent path traversal
        const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
        if (sanitizedFilename !== filename) {
            console.warn('Filename sanitized for security:', filename, '->', sanitizedFilename);
        }

        // Defensive: Ensure directory exists
        if (!fs.existsSync(directory)) {
            try {
                fs.mkdirSync(directory, { recursive: true });
            } catch (mkdirError) {
                throw new Error(`Cannot create directory ${directory}: ${mkdirError.message}`);
            }
        }

        // Defensive: Check if directory is writable
        try {
            const testFile = path.join(directory, '.write-test');
            fs.writeFileSync(testFile, 'test');
            fs.unlinkSync(testFile);
        } catch (writeTestError) {
            throw new Error(`Directory ${directory} is not writable: ${writeTestError.message}`);
        }

        const fullPath = path.join(directory, sanitizedFilename);

        // Defensive: Check if file exists and create backup
        let backupPath = null;
        if (fs.existsSync(fullPath)) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            backupPath = `${fullPath}.backup.${timestamp}`;
            fs.copyFileSync(fullPath, backupPath);
            console.info(`Created backup: ${backupPath}`);
        }

        fs.writeFileSync(fullPath, content);
        return {
            success: true,
            path: fullPath,
            backup: backupPath
        };
    } catch (error) {
        console.error('File write error:', error);
        return {
            success: false,
            error: error.message,
            code: error.code || 'UNKNOWN_ERROR'
        };
    }
});

// 3. Delete Items (for Clear Workspace)
ipcMain.handle('delete-items', async (event, { directory, mode, venvName }) => {
    try {
        if (!directory || !fs.existsSync(directory)) {
            return { success: false, error: 'Directory not found' };
        }

        const items = fs.readdirSync(directory);
        let count = 0;

        for (const item of items) {
            const itemPath = path.join(directory, item);

            // Logic matching index.html
            if (mode === 'repo' && item === venvName) continue;

            if (mode === 'env') {
                const targets = [venvName, 'node_modules', 'db.sqlite3', '__pycache__'];
                const isPyc = item.endsWith('.pyc');
                if (!targets.includes(item) && !isPyc) continue;
            }

            try {
                fs.rmSync(itemPath, { recursive: true, force: true });
                count++;
            } catch (err) {
                console.warn(`Failed to delete ${item}: ${err.message}`);
            }
        }
        return { success: true, count };
    } catch (error) {
        console.error('Delete error:', error);
        return { success: false, error: error.message };
    }
});

// 4. Run External Terminal
ipcMain.handle('run-external-terminal', async (event, { directory }) => {
    const platform = os.platform();
    console.log(`Launching terminal in: ${directory} on ${platform}`);

    // Defensive: Validate directory
    if (!directory || typeof directory !== 'string') {
        return { success: false, error: 'Invalid directory path provided' };
    }

    if (!fs.existsSync(directory)) {
        return { success: false, error: `Directory does not exist: ${directory}` };
    }

    // Defensive: Check if setup.sh exists
    const setupScript = path.join(directory, 'setup.sh');
    if (!fs.existsSync(setupScript)) {
        return { success: false, error: 'setup.sh not found in directory' };
    }

    // Defensive: Check if setup.sh is executable
    try {
        fs.accessSync(setupScript, fs.constants.X_OK);
    } catch (accessError) {
        console.warn('setup.sh is not executable, attempting to fix permissions...');
        try {
            fs.chmodSync(setupScript, '755');
        } catch (chmodError) {
            return { success: false, error: `setup.sh is not executable and cannot fix permissions: ${chmodError.message}` };
        }
    }

    const terminals = [];
    let lastError = null;

    try {
        if (platform === 'linux') {
            // Robust execution: Use absolute path and explicit bash
            const cleanPath = setupScript.replace(/"/g, '\\"');
            const cmdStr = `bash "${cleanPath}"; exec bash`;

            // Multiple terminal fallback chain
            terminals.push(
                { cmd: 'gnome-terminal', args: ['--', 'bash', '-c', cmdStr] },
                { cmd: 'konsole', args: ['-e', 'bash', '-c', cmdStr] },
                { cmd: 'xfce4-terminal', args: ['-e', 'bash', '-c', cmdStr] },
                { cmd: 'xterm', args: ['-e', 'bash', '-c', cmdStr] },
                { cmd: 'lxterminal', args: ['-e', 'bash', '-c', cmdStr] }
            );

            for (const terminal of terminals) {
                try {
                    const child = spawn(terminal.cmd, terminal.args, {
                        cwd: directory,
                        detached: true,
                        stdio: 'ignore'
                    });
                    child.unref();

                    // Give it a moment to start
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Check if process is still running
                    if (child.pid && !child.killed) {
                        console.log(`Successfully launched terminal: ${terminal.cmd}`);
                        return { success: true, terminal: terminal.cmd };
                    }
                } catch (terminalError) {
                    console.warn(`Failed to launch ${terminal.cmd}:`, terminalError.message);
                    lastError = terminalError;
                    continue;
                }
            }

            throw lastError || new Error('No suitable terminal found');
        }
        else if (platform === 'darwin') {
            // macOS Terminal with fallback to iTerm
            // Robust execution: Use absolute path
            const cleanPath = setupScript.replace(/"/g, '\\"');
            const cmdStr = `bash "${cleanPath}"`;

            terminals.push(
                {
                    cmd: 'osascript',
                    args: ['-e', `tell application "Terminal" to do script "${cmdStr}" activate`]
                },
                {
                    cmd: 'osascript',
                    args: ['-e', `tell application "iTerm" to create window with default profile command "${cmdStr}"`]
                }
            );

            for (const terminal of terminals) {
                try {
                    const child = spawn(terminal.cmd, terminal.args, {
                        cwd: directory,
                        detached: true,
                        stdio: 'ignore'
                    });
                    child.unref();

                    await new Promise(resolve => setTimeout(resolve, 100));
                    return { success: true, terminal: terminal.cmd };
                } catch (terminalError) {
                    console.warn(`Failed to launch macOS terminal:`, terminalError.message);
                    lastError = terminalError;
                }
            }

            throw lastError || new Error('Failed to launch any macOS terminal');
        }
        else if (platform === 'win32') {
            // Windows with PowerShell and CMD fallbacks
            // Robust execution: Use absolute path and explicit bash execution
            // Use forward slashes for safe bash execution on Windows
            const bashPath = setupScript.replace(/\\/g, '/');
            const cmdStr = `bash "${bashPath}"`;

            terminals.push(
                {
                    cmd: 'powershell.exe',
                    args: ['-Command', `Start-Process cmd.exe -ArgumentList '/k', 'bash', '"${bashPath}"'`]
                },
                {
                    cmd: 'cmd.exe',
                    // cd /d combined with bash execution
                    args: ['/c', 'start', 'cmd.exe', '/k', `cd /d "${directory}" && ${cmdStr}`]
                },
                {
                    cmd: 'wt.exe',
                    args: ['new', 'cmd', '/k', `cd /d "${directory}" && ${cmdStr}`]
                }
            );

            for (const terminal of terminals) {
                try {
                    const child = spawn(terminal.cmd, terminal.args, {
                        cwd: directory,
                        detached: true,
                        stdio: 'ignore',
                        shell: true
                    });
                    child.unref();

                    await new Promise(resolve => setTimeout(resolve, 100));
                    return { success: true, terminal: terminal.cmd };
                } catch (terminalError) {
                    console.warn(`Failed to launch Windows terminal:`, terminalError.message);
                    lastError = terminalError;
                }
            }

            throw lastError || new Error('Failed to launch any Windows terminal');
        }

        return { success: true };
    } catch (error) {
        console.error('Terminal launch error:', error);

        // Provide helpful guidance
        let userMessage = error.message;
        if (platform === 'linux') {
            userMessage += '\n\nSuggestion: Install a terminal emulator: sudo apt install gnome-terminal konsole xterm';
        } else if (platform === 'win32') {
            userMessage += '\n\nSuggestion: Ensure Command Prompt or PowerShell is available';
        }

        return {
            success: false,
            error: userMessage,
            platform: platform,
            code: error.code || 'TERMINAL_LAUNCH_FAILED'
        };
    }
});
