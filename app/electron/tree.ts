import fs from "fs";

const EXCLUDED_FOLDERS: string[] = [".git", ".noted"];
const INCLUDED_EXTENSIONS = ["noted", "pdf", "excalidraw"];

interface FileInfo {
  path: string;
  name: string | null;
  type: "folder" | "file";
  items: FileInfo[];
  id: string;
}

class Tree {
  path: string;
  name: string | null;
  type: "folder";
  items: FileInfo[];
  id: string;

  constructor(path: string, name: string | null = null) {
    this.path = path;
    this.name = name;
    this.type = "folder";
    this.items = [];
    this.id = path;
  }

  build = () => {
    this.items = Tree.readDir(this.path);
  };

  static readDir(path: string): FileInfo[] {
    const fileArray: FileInfo[] = [];

    fs.readdirSync(path).forEach((file: string) => {
      if (EXCLUDED_FOLDERS.includes(file)) return;

      let fileInfo: FileInfo;
      if (process.platform === "linux") {
        fileInfo = new Tree(`${path}/${file}`, file);
      } else {
        fileInfo = new Tree(`${path}\\${file}`, file);
      }

      const stat: fs.Stats = fs.statSync(fileInfo.path);
      const isFolder: boolean = stat.isDirectory();

      const extension = file.split(".").pop() || "";
      if (!INCLUDED_EXTENSIONS.includes(extension) && !isFolder) return;

      if (stat.isDirectory()) {
        fileInfo.items = Tree.readDir(fileInfo.path);
      }

      fileInfo.type = isFolder ? "folder" : "file";

      fileArray.push(fileInfo);
    });
    return fileArray;
  }
}

export default Tree;
