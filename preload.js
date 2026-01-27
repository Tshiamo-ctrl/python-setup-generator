const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    saveFile: (directory, filename, content) => ipcRenderer.invoke('save-file', { directory, filename, content }),
    deleteItems: (directory, mode, venvName) => ipcRenderer.invoke('delete-items', { directory, mode, venvName }),
    openTerminal: (directory) => ipcRenderer.invoke('run-external-terminal', { directory }),
    readDirectoryRecursive: (directory) => ipcRenderer.invoke('read-directory-recursive', { directory }),
    showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options)
});
