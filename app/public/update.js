const { ipcMain, app } = require("electron")
const { autoUpdater } = require("electron-updater")

class Updates {
  win = null
  constructor(win) {
    this.win = win
  }

  handle() {
    ipcMain.handle("updates:check", async (event) => {
      try {
        const update = await autoUpdater.checkForUpdates()
        const curr_version = app.getVersion()
        if (update.updateInfo.version !== curr_version) {
          return update
        }
        return false
      } catch (error) {
        return error
      }
    })

    ipcMain.handle("updates:download", async (event) => {
      try {
        this.win.webContents.send("loaded", "downloading update")
        await autoUpdater.downloadUpdate()
      } catch (error) {
        this.win.webContents.send("loaded", "error downloading update")
      }
    })

    ipcMain.handle("updates:update-and-restart", async (event) => {
      try {
        this.win.webContents.send("loaded", "restating app")
        autoUpdater.quitAndInstall(true, true)
      } catch (error) {
        this.win.webContents.send("loaded", "error installing update")
      }
    })

    autoUpdater.on("update-downloaded", () => {
      this.win.webContents.send("loaded", "update downloaded")
    })

    ipcMain.handle("quitAndUpdate", async (event) => {
      autoUpdater.quitAndInstall(true, false)
    })
  }
}

module.exports = Updates
