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
        // Defensive: Check if file exists (Overwrite without backup as requested)
        // const backupPath = null; // Backups disabled to prevent clutter

        fs.writeFileSync(fullPath, content);

        // Auto-make shell scripts executable to avoid race conditions/warnings during execution
        if (sanitizedFilename.endsWith('.sh') && process.platform !== 'win32') {
            try {
                fs.chmodSync(fullPath, '755');
            } catch (chmodErr) {
                console.warn(`Failed to set executable permissions for ${fullPath}:`, chmodErr);
            }
        }

        return {
            success: true,
            path: fullPath
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
            // Robust execution: Create a wrapper script to bypass argument parsing hell
            const wrapperPath = path.join(directory, '.run_setup.sh');
            const cleanPath = setupScript.replace(/"/g, '\\"');

            // Log for debugging
            console.log('Creating wrapper script at:', wrapperPath);

            // Create wrapper content
            // Create wrapper content - STRICT RELATIVE EXECUTION
            const wrapperContent = `#!/bin/bash
echo "🚀 Initializing Setup in: ${directory}"
cd "${directory}" || { echo "❌ Failed to change directory"; exec bash; }

echo "📂 Working Directory: $(pwd)"

if [ -f "setup.sh" ]; then
    echo "🔧 Setting permissions..."
    chmod +x setup.sh dev-server.sh fresh-db.sh 2>/dev/null

    echo "▶️ Running setup.sh..."
    ./setup.sh
else
    echo "❌ Error: setup.sh not found!"
    ls -la
fi

echo "✅ Execution process finished."
exec bash
`;
            fs.writeFileSync(wrapperPath, wrapperContent);
            fs.chmodSync(wrapperPath, '755');

            // Explicitly use the wrapper check
            terminals.push(
                { cmd: 'gnome-terminal', args: ['--', wrapperPath] },
                { cmd: 'konsole', args: ['-e', wrapperPath] },
                { cmd: 'xfce4-terminal', args: ['-e', wrapperPath] },
                { cmd: 'xterm', args: ['-e', wrapperPath] },
                { cmd: 'lxterminal', args: ['-e', wrapperPath] }
            );

            for (const terminal of terminals) {
                try {
                    const child = spawn(terminal.cmd, terminal.args, {
                        cwd: directory,
                        detached: true,
                        stdio: 'ignore'
                    });
                    child.unref(); // Allow app to continue regardless of terminal logic

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

// 5. Read Directory Recursive (for Archive)
ipcMain.handle('read-directory-recursive', async (event, { directory }) => {
    try {
        if (!directory || !fs.existsSync(directory)) {
            return { success: false, error: 'Directory not found' };
        }

        const files = [];
        const skipDirs = ['.git', 'node_modules', '__pycache__', '.pytest_cache', 'test_venv', '.vscode', '.idea'];
        // Note: venv skipping is handled by checking name against known venv names in recursion if needed, 
        // but here we just emulate the renderer logic or accept a skip list.
        // For simplicity, we'll verify the skip list strategy.

        async function readRecursively(currentPath, relativePath) {
            const entries = fs.readdirSync(currentPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(currentPath, entry.name);
                const relPath = relativePath ? path.join(relativePath, entry.name) : entry.name;

                if (entry.isDirectory()) {
                    if (skipDirs.includes(entry.name)) continue;
                    // Also skip if it looks like a venv (contains bin/activate or Scripts/activate) - naive check
                    // Better to rely on the caller or standard excludes.
                    if (entry.name === 'venv' || entry.name.endsWith('VENV')) continue; 

                    await readRecursively(fullPath, relPath);
                } else if (entry.isFile()) {
                    if (entry.name.endsWith('.pyc') || entry.name === '.DS_Store') continue;

                    const data = fs.readFileSync(fullPath);
                    files.push({
                        name: relPath, // Use forward slashes for tar consistency if needed, but fs handles path.join
                        data: data // Send buffer
                    });
                }
            }
        }

        await readRecursively(directory, '');
        return { success: true, files };

    } catch (error) {
        console.error('Read directory error:', error);
        return { success: false, error: error.message };
    }
});

// 6. Show Save Dialog
ipcMain.handle('show-save-dialog', async (event, { defaultPath, filters }) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        defaultPath,
        filters
    });
    return result;
});
