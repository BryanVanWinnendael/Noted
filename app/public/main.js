const { app, ipcMain, BrowserWindow, screen } = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")
const { shell } = require("electron")
const { autoUpdater } = require("electron-updater")
const Updates = require("./update")
const Themes = require("./theme")
const Files = require("./file")
const wallpaper = require('wallpaper')
//Basic flags
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

let win

require("@electron/remote/main").initialize()


function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 500,
    minWidth: 550,
    frame: false,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false
    },
    
  })
  win.webContents.openDevTools()
  win.setMenu(null)
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
  )

  const updater = new Updates(win)
  updater.handle()

  const theme = new Themes(win)
  theme.handle()

  const files = new Files(win)
  files.handle()

  ipcMain.on('asynchronous-message', async (event, arg) => {
    const wallpaperString = await wallpaper.get()
    const screenConfig = {
      width: screen.getPrimaryDisplay().workAreaSize.width,
      height: screen.getPrimaryDisplay().workAreaSize.height, 
      wallpaper: wallpaperString,
      top: win.getPosition()[1],
      left: win.getPosition()[0]
    }
    event.sender.send('wallpaper', screenConfig);
    win.on('move', () => {
      screenConfig.top = win.getPosition()[1]
      screenConfig.left = win.getPosition()[0]
      event.sender.send('wallpaper', screenConfig);
    })
  });

  ipcMain.handle("minimize-window", async (event) => {
    win.minimize()
  })

  ipcMain.handle("maximize-window", async (event) => {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  ipcMain.handle("close-window", async (event) => {
    if (process.platform !== "darwin") {
      app.quit()
    }
  })

  ipcMain.handle("openBrowser", async (event, link) => {
    shell.openExternal(link)
  })
}

app.whenReady().then(() => {
  createWindow()

  win.once('ready-to-show', () => {
    win.show()
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
