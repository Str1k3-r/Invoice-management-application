import {app, BrowserWindow} from 'electron'

var path = require('path')
var ipc = require("electron").ipcMain

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`


var APP_DIR = path.resolve(__dirname, 'src')

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        useContentSize: true,
        autoHideMenuBar: true,
        width: 1360,
        height: 768,
        resizable: true,
        backgroundColor: '#F8F8F8',
        webPreferences: {
            webSecurity: false
        }
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    ipc.on('print-data', function (event, args) {
        mainWindow.webContents.print({pageSize: 'A5'}, (success) => {
            event.sender.send("data-printed", true);
        });

    })

    ipc.on('print-bill', function (event, args) {
        mainWindow.webContents.print({pageSize: 'A5'}, (success) => {
            event.sender.send("bill-printed", true);
        });

    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})



/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
