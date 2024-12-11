import { ipcMain, dialog, OpenDialogReturnValue } from "electron";
import fs from "fs";
import path from "path";
import Tree from "./tree";

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
        const tree = new Tree(filePaths[0]);

        tree.build();
        const treeObject = this.treeToObject(tree);
        this.initNotedFolder(filePaths[0]);
        return treeObject;
      }
      return null;
    });

    ipcMain.handle(
      "folder:open",
      async (_event, params: { folder_path: string }) => {
        const folderPath = params.folder_path;
        const tree = new Tree(folderPath);

        tree.build();
        const treeObject = this.treeToObject(tree);
        return treeObject;
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

    ipcMain.handle(
      "workspace:reset",
      async (_event, params: { workspace_path: string }) => {
        const workspacePath = params.workspace_path;
        const settingsPath = path.join(workspacePath, ".noted");

        if (fs.existsSync(settingsPath)) {
          fs.rmSync(settingsPath, { recursive: true, force: true });
        }
      },
    );
  }

  treeToObject = (tree: Tree | FileInfo): any => {
    const treeObject: any = {};
    const folderName = path.basename(tree.path);
    treeObject.name = folderName;
    treeObject.path = tree.path;
    treeObject.items = [];
    treeObject.type = tree.type;
    treeObject.id = tree.path;
    tree.items.forEach((item) => {
      if (item.type === "folder") {
        const folder = this.treeToObject(item);
        treeObject.items.push(folder);
      } else {
        const file = {
          name: item.name,
          path: item.path,
          type: item.type,
          id: item.path,
        };
        treeObject.items.push(file);
      }
    });
    return treeObject;
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
