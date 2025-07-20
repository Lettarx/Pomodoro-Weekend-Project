const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window'),
    alwaysOnTopChange: () => ipcRenderer.send('always-on-top-change'),
    start: () => ipcRenderer.send('change_file'),
    getTimeWork: () => ipcRenderer.invoke('get-time-work'),
    getTimeRest: () => ipcRenderer.invoke('get-time-rest'),
    setTimeWork: (time) => ipcRenderer.send('set-time-work',time),
    setTimeRest: (time) => ipcRenderer.send('set-time-rest',time),
})
