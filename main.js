const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

let win

function createWindow(){
    win = new BrowserWindow({
        width: 500,
        height: 500,
        maxHeight:300,
        maxWidth:200,
        transparent: true, 
        frame:false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, 
            nodeIntegration: false, 
            enableRemoteModule: false 
        },
        alwaysOnTop: true
        
    })
    win.setTitle('')
    win.loadFile('src/public/menu/index.html')
}

app.whenReady().then(()=> {
    createWindow()

    app.on('activate', ()=>{
        if (BrowserWindow.getAllWindows().length ===0) { //Si no hay ventanas activas
        createWindow() //Se crea una ventana
        }
    })

    ipcMain.on('minimize-window', () => {
       win.minimize();
     });

     ipcMain.on('close-window', () => {
       win.close();
     });
    
    ipcMain.on('change_file', () => {
        win.loadFile('src/public/pomodoro/index.html')
    })

    ipcMain.on('always-on-top-change', () => {
        value = win.isAlwaysOnTop()
        win.setAlwaysOnTop(!value)
    })

    let timeWork = null
    let timeRest = null

    ipcMain.handle('get-time-work', () => timeWork)
    ipcMain.on('set-time-work', (event, time)=>{
        timeWork = time
    })

    ipcMain.handle('get-time-rest', () => timeRest)
    ipcMain.on('set-time-rest', (event, time)=>{
        timeRest = time
    })
})

app.on('window-all-closed',()=>{
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
