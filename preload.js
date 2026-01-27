const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    saveFile: (directory, filename, content) => ipcRenderer.invoke('save-file', { directory, filename, content }),
    openTerminal: (directory) => ipcRenderer.invoke('run-external-terminal', { directory })
});
