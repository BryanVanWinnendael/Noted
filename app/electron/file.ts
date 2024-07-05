import { OpenDialogReturnValue, dialog, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import defaultHomeFile from "./default_home_text.json";

class Files {
  win = null;
  constructor(win: any) {
    this.win = win;
  }

  initNotedFolder = (workspacePath: string) => {
    const notedFolderPath = path.join(workspacePath, ".noted");
    if (!fs.existsSync(notedFolderPath)) {
      fs.mkdirSync(notedFolderPath);
    }

    const settingsPath = path.join(notedFolderPath, "./settings.json");
    if (!fs.existsSync(settingsPath)) {
      fs.writeFileSync(settingsPath, JSON.stringify({}));
    }
  };

  handle() {
    ipcMain.handle("file:open", async (_, params) => {
      const filePath = params.file_path;
      const fileContent = fs.readFileSync(filePath, "utf8");
      const fileName = path.basename(filePath);

      return { filePath, fileName, fileContent };
    });

    ipcMain.handle("file:save", async (_, params) => {
      if (params.file_path) {
        fs.writeFile(params.file_path, params.file_content, function (err) {
          if (err) throw err;
        });
        return "success";
      }
      return "error";
    });

    ipcMain.handle("file:save-pdf", async (_, params) => {
      if (params.file_path) {
        const content = params.file_content;
        const buffer = Buffer.from(content);
        fs.writeFile(params.file_path, buffer, function (err) {
          if (err) throw err;
        });
        return "success";
      }
      return "error";
    });

    ipcMain.handle("file:settings-save", async (_, params) => {
      const workspacePath = params.workspace_path;
      const settingsPath = path.join(workspacePath, ".noted/settings.json");
      if (!fs.existsSync(settingsPath)) this.initNotedFolder(workspacePath);

      fs.writeFile(settingsPath, params.settings, (err) => {
        if (err) throw this.initNotedFolder(workspacePath);
      });
    });

    ipcMain.handle("file:settings-get", async (_, params) => {
      const workspacePath = params.workspace_path;
      const settingsPath = path.join(workspacePath, ".noted/settings.json");
      if (!fs.existsSync(settingsPath)) this.initNotedFolder(workspacePath);

      const settings = fs.readFileSync(settingsPath, "utf8");
      return settings;
    });

    ipcMain.handle("file:new", async (_, params) => {
      const folder = params.folder;
      const fileName = params.file_name;
      const filePath = path.join(folder, fileName);

      if (fs.existsSync(filePath)) {
        throw new Error("File already exists");
      }

      fs.writeFile(filePath, "", function (err) {
        if (err) throw err;
      });

      return filePath;
    });

    ipcMain.handle("file:delete", async (_, params) => {
      const filePath = params.file_path;

      if (!fs.existsSync(filePath)) {
        throw new Error("File not found");
      }

      fs.unlinkSync(filePath);
    });

    ipcMain.handle("file:rename", async (_, params) => {
      const oldPath = params.old_path;
      const newPath = params.new_path;

      if (fs.existsSync(newPath)) {
        throw new Error("File already exists");
      }
      try {
        fs.renameSync(oldPath, newPath);
      } catch (e) {
        throw new Error("Error renaming file");
      }
    });

    ipcMain.handle("file:import-background", async (_, params) => {
      const workspacePath = params.workspace_path;

      const { canceled, filePaths }: OpenDialogReturnValue =
        await dialog.showOpenDialog(this.win!, {
          filters: [{ name: "Images", extensions: ["jpg", "png", "jpeg"] }],
        });
      if (!canceled && filePaths && filePaths[0]) {
        // copy the image to the noted folder
        const notedFolderPath = path.join(workspacePath, ".noted/backgrounds");
        if (!fs.existsSync(notedFolderPath)) {
          fs.mkdirSync(notedFolderPath);
        }
        // get filename
        const fileName = path.basename(filePaths[0]);
        const backgroundPath = path.join(notedFolderPath, fileName);
        fs.copyFileSync(filePaths[0], backgroundPath);
        if (process.platform === "linux")
          return path.join("file:/", backgroundPath);
        return backgroundPath;
      }
      return null;
    });

    ipcMain.handle("file:get-imported-background", async (_, params) => {
      const workspacePath = params.workspace_path;
      const notedFolderPath = path.join(workspacePath, ".noted/backgrounds");
      if (!fs.existsSync(notedFolderPath)) {
        return [];
      }
      const files = fs.readdirSync(notedFolderPath);
      return files.map((file) => {
        if (process.platform === "linux")
          return path.join("file:/", notedFolderPath, file);
        return path.join(notedFolderPath, file);
      });
    });

    ipcMain.handle("file:delete-imported-background", async (_, params) => {
      const workspacePath = params.workspace_path;
      const backgroundPath = params.background_path;

      const notedFolderPath = path.join(workspacePath, ".noted/backgrounds");
      if (!fs.existsSync(notedFolderPath)) {
        return;
      }
      fs.unlinkSync(backgroundPath);
    });

    ipcMain.handle("file:open-workspace-file", async (_, params) => {
      const workspacePath = params.workspace_path;
      let name;
      if (process.platform === "linux") {
        name = workspacePath?.split("/").pop() + ".home.noted";
      } else {
        name = workspacePath?.split("\\").pop() + ".home.noted";
      }

      const filePath = path.join(workspacePath, name);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultHomeFile));
      }

      const fileContent = fs.readFileSync(filePath, "utf8");
      return { filePath, fileContent };
    });
  }
}

export default Files;
