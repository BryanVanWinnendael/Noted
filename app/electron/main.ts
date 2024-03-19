import { app, BrowserWindow, ipcMain, shell } from "electron"
import path from "node:path"
import Updates from "./update"
import Files from "./file"
import Folders from "./folder"
import Themes from "./theme"
import { getWallpaper } from "wallpaper"
import { screen } from "electron"
import { autoUpdater } from "electron-updater"

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist")
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public")

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"]

// const isDev = !app.isPackaged

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
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  })

  win.webContents.openDevTools()
  win.setMenu(null)

  const updater = new Updates(win)
  updater.handle()

  const theme = new Themes(win)
  theme.handle()

  const files = new Files(win)
  files.handle()

  const folders = new Folders(win)
  folders.handle()

  ipcMain.handle("minimize-window", async () => {
    win?.minimize()
  })

  ipcMain.handle("maximize-window", async () => {
    if (win?.isMaximized()) {
      win.unmaximize()
    } else {
      win?.maximize()
    }
  })

  ipcMain.handle("close-window", async () => {
    if (process.platform !== "darwin") {
      app.quit()
    }
  })

  ipcMain.on("asynchronous-message", async (event) => {
    try {
      const wallpaperString = await getWallpaper()

      const screenConfig = {
        width: screen.getPrimaryDisplay().workAreaSize.width,
        height: screen.getPrimaryDisplay().workAreaSize.height,
        wallpaper: wallpaperString,
        top: win?.getPosition()[1],
        left: win?.getPosition()[0],
      }
      event.sender.send("wallpaper", screenConfig)
      win?.on("move", () => {
        screenConfig.top = win?.getPosition()[1]
        screenConfig.left = win?.getPosition()[0]
        event.sender.send("wallpaper", screenConfig)
      })
    } catch (error) {
      console.error(error)
    }
  })

  ipcMain.handle("openBrowser", async (_, link) => {
    shell.openExternal(link)
  })

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
    win = null
  }
})

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
