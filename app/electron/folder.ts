import { ipcMain, dialog, OpenDialogReturnValue } from "electron";
import fs from "fs";
import path from "path";
import FileTree from "./fileTree";

interface FileInfo {
  path: string;
  name: string | null;
  type: "folder" | "file";
  items: FileInfo[];
}

class Folders {
  win: Electron.BrowserWindow | null;
  constructor(win: Electron.BrowserWindow) {
    this.win = win;
  }

  handle() {
    ipcMain.handle("folder:open-dialog", async () => {
      const { canceled, filePaths }: OpenDialogReturnValue =
        await dialog.showOpenDialog(this.win!, {
          properties: ["openDirectory"],
        });
      if (!canceled && filePaths && filePaths[0]) {
        const fileTree = new FileTree(filePaths[0]);

        fileTree.build();
        const fileTreeObject = this.fileTreeToObject(fileTree);
        this.initNotedFolder(filePaths[0]);
        return fileTreeObject;
      }
      return null;
    });

    ipcMain.handle(
      "folder:open",
      async (_event, params: { folder_path: string }) => {
        const folderPath = params.folder_path;
        console.log("folder:open", folderPath);
        const fileTree = new FileTree(folderPath);

        fileTree.build();
        const fileTreeObject = this.fileTreeToObject(fileTree);
        return fileTreeObject;
      },
    );

    ipcMain.handle(
      "folder:new",
      async (_event, params: { folder: string; folder_name: string }) => {
        const { folder, folder_name } = params;
        const folderPath = path.join(folder, folder_name);

        if (fs.existsSync(folderPath)) {
          throw new Error("Folder already exists");
        }

        fs.mkdirSync(folderPath);

        return folderPath;
      },
    );

    ipcMain.handle(
      "folder:delete",
      async (_event, params: { folder_path: string }) => {
        const folderPath = params.folder_path;

        if (!fs.existsSync(folderPath)) {
          throw new Error("Folder not found");
        }

        fs.rmSync(folderPath, { recursive: true, force: true });
      },
    );

    ipcMain.handle(
      "folder:rename",
      async (_event, params: { old_path: string; new_path: string }) => {
        const { old_path, new_path } = params;

        if (fs.existsSync(new_path)) {
          throw new Error("Folder already exists");
        }

        fs.renameSync(old_path, new_path);
      },
    );
  }

  fileTreeToObject = (fileTree: FileTree | FileInfo): any => {
    const fileTreeObject: any = {};
    const folderName = path.basename(fileTree.path);
    fileTreeObject.name = folderName;
    fileTreeObject.path = fileTree.path;
    fileTreeObject.items = [];
    fileTreeObject.type = fileTree.type;
    fileTreeObject.id = fileTree.path;
    fileTree.items.forEach((item) => {
      if (item.type === "folder") {
        const folder = this.fileTreeToObject(item);
        fileTreeObject.items.push(folder);
      } else {
        const file = {
          name: item.name,
          path: item.path,
          type: item.type,
          id: item.path,
        };
        fileTreeObject.items.push(file);
      }
    });
    return fileTreeObject;
  };

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
}

export default Folders;
