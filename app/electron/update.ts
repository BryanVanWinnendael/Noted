import { ipcMain, app, BrowserWindow } from "electron"
import { autoUpdater } from "electron-updater"

class Updates {
  win: BrowserWindow | null

  constructor(win: BrowserWindow) {
    this.win = win
  }

  handle() {
    ipcMain.handle("updates:check", async () => {
      try {
        const update = await autoUpdater.checkForUpdates()
        const curr_version = app.getVersion()
        const isNewerVersion = (v1: string, v2: string) => {
          const v1parts = v1.split(".").map(Number)
          const v2parts = v2.split(".").map(Number)
          for (let i = 0; i < v1parts.length; ++i) {
            if (v2parts.length === i) return false
            if (v1parts[i] === v2parts[i]) continue
            return v1parts[i] < v2parts[i]
          }
          return v1parts.length !== v2parts.length
        }
        if (isNewerVersion(curr_version, update?.updateInfo.version || "")) {
          return true
        }
        return false
      } catch (error) {
        return error
      }
    })

    ipcMain.handle("updates:download", async () => {
      try {
        if (this.win) {
          this.win.webContents.send("loaded", "downloading update")
        }
        await autoUpdater.downloadUpdate()
      } catch (error) {
        if (this.win) {
          this.win.webContents.send("loaded", "error downloading update")
        }
      }
    })

    ipcMain.handle("updates:update-and-restart", async () => {
      try {
        if (this.win) {
          this.win.webContents.send("loaded", "restarting app")
        }
        autoUpdater.quitAndInstall(true, true)
      } catch (error) {
        if (this.win) {
          this.win.webContents.send("loaded", "error installing update")
        }
      }
    })

    autoUpdater.on("update-downloaded", () => {
      if (this.win) {
        this.win.webContents.send("loaded", "update downloaded")
      }
    })

    ipcMain.handle("quitAndUpdate", async () => {
      autoUpdater.quitAndInstall(true, false)
    })
  }
}

export default Updates
