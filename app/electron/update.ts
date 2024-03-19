import { ipcMain, app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";

class Updates {
  win: BrowserWindow | null;

  constructor(win: BrowserWindow) {
    this.win = win;
  }

  handle() {
    ipcMain.handle("updates:check", async () => {
      try {
        const update = await autoUpdater.checkForUpdates();
        const curr_version = app.getVersion();
        if (update?.updateInfo.version !== curr_version) {
          return update;
        }
        return false;
      } catch (error) {
        return error;
      }
    });

    ipcMain.handle("updates:download", async () => {
      try {
        if (this.win) {
          this.win.webContents.send("loaded", "downloading update");
        }
        await autoUpdater.downloadUpdate();
      } catch (error) {
        if (this.win) {
          this.win.webContents.send("loaded", "error downloading update");
        }
      }
    });

    ipcMain.handle("updates:update-and-restart", async () => {
      try {
        if (this.win) {
          this.win.webContents.send("loaded", "restarting app");
        }
        autoUpdater.quitAndInstall(true, true);
      } catch (error) {
        if (this.win) {
          this.win.webContents.send("loaded", "error installing update");
        }
      }
    });

    autoUpdater.on("update-downloaded", () => {
      if (this.win) {
        this.win.webContents.send("loaded", "update downloaded");
      }
    });

    ipcMain.handle("quitAndUpdate", async () => {
      autoUpdater.quitAndInstall(true, false);
    });
  }
}

export default Updates;
