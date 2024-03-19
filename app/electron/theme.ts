import { ipcMain, dialog, IpcMainInvokeEvent } from "electron";
import fs from "fs";
import path from "path";


class Themes {
  win: Electron.BrowserWindow | null;

  constructor(win: Electron.BrowserWindow) {
    this.win = win;
  }

  handle() {
    ipcMain.handle("theme:open-file", async (_event: IpcMainInvokeEvent, params: { filePath: string }) => {
      try {
        const data = fs.readFileSync(params.filePath, "utf8");
        const jsonData = JSON.parse(data);
        return jsonData;
      } catch (err) {
        throw new Error("Failed to open file");
      }
    });

    ipcMain.handle("theme:save-file", async (_event: IpcMainInvokeEvent, params: any) => {
      try {
        fs.writeFileSync(params.filePath, params.fileContent);
        return "success";
      } catch (err) {
        throw new Error("Failed to save file");
      }
    });

    ipcMain.handle("theme:export", async () => {
      try {
        const { canceled, filePath } = await dialog.showSaveDialog(this.win!, {
          properties: ["openFile"] as any,
          defaultPath: "~/Untitled",
          filters: [{ name: "json", extensions: ["json"] }],
        });
        if (canceled || !filePath) {
          throw new Error("Canceled or no file path");
        }
        return { filePath };
      } catch (err) {
        throw new Error("Failed to export file");
      }
    });

    ipcMain.handle("theme:import", async () => {
      try {
        const { canceled, filePaths } = await dialog.showOpenDialog(this.win!, {
          properties: ["openFile"],
          filters: [{ name: "json", extensions: ["json"] }],
        });
        if (canceled || !filePaths || filePaths.length === 0) {
          throw new Error("Canceled or no file path");
        }
        const data = fs.readFileSync(filePaths[0], "utf8");
        const jsonData = JSON.parse(data);
        return { filePath: filePaths[0], data: jsonData };
      } catch (err) {
        throw new Error("Failed to import file");
      }
    });

    ipcMain.handle("theme:settings-save", async (_event: IpcMainInvokeEvent, params: { workspace_path: string, name: string, theme: string }) => {
      try {
        const themesPath = path.join(params.workspace_path, ".noted/themes");
        if (!fs.existsSync(themesPath)) {
          fs.mkdirSync(themesPath);
        }
        const settingsPath = path.join(themesPath, `${params.name}.json`);
        fs.writeFileSync(settingsPath, params.theme);
      } catch (err) {
        throw new Error("Failed to save theme settings");
      }
    });

    ipcMain.handle("theme:settings-get", async (_event: IpcMainInvokeEvent, params: { workspace_path: string }) => {
      try {
        const themesPath = path.join(params.workspace_path, ".noted/themes");
        if (!fs.existsSync(themesPath)) {
          fs.mkdirSync(themesPath);
          return {};
        }

        const files = fs.readdirSync(themesPath);
        const res: { [name: string]: any } = {};

        files.forEach((file) => {
          const data = fs.readFileSync(path.join(themesPath, file), "utf8");
          res[file.replace(".json", "")] = JSON.parse(data);
        });

        return res;
      } catch (err) {
        throw new Error("Failed to get theme settings");
      }
    });

    ipcMain.handle("theme:settings-delete", async (_event: IpcMainInvokeEvent, params: { workspace_path: string, name: string }) => {
      try {
        const themesPath = path.join(params.workspace_path, ".noted/themes");
        if (!fs.existsSync(themesPath)) {
          fs.mkdirSync(themesPath);
        }
        const settingsPath = path.join(themesPath, `${params.name}.json`);
        fs.unlinkSync(settingsPath);
      } catch (err) {
        throw new Error("Failed to delete theme settings");
      }
    });
  }
}

export default Themes;
