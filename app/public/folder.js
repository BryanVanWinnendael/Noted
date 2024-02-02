const { ipcMain, dialog } = require("electron")
const fs = require("fs")
const path = require("path")
const FileTree = require("./fileTree")

class Folders {
  win = null
  constructor(win) {
    this.win = win
  }

  handle() {
    ipcMain.handle("folder:open-dialog", async (event) => {
      const { canceled, filePaths } = await dialog.showOpenDialog(this.win, {
        properties: ["openDirectory"],
      })
      if (!canceled && filePaths[0]) {
        const fileTree = new FileTree(filePaths[0])

        fileTree.build()
        const fileTreeObject = this.fileTreeToObject(fileTree)
        this.initNotedFolder(filePaths[0])
        return fileTreeObject
      }
      return null
    })

    ipcMain.handle("folder:open", async (event, params) => {
      const folderPath = params.folder_path
      const fileTree = new FileTree(folderPath)

      fileTree.build()
      const fileTreeObject = this.fileTreeToObject(fileTree)
      return fileTreeObject
    })

    ipcMain.handle("folder:new", async (event, params) => {
      const folder = params.folder
      const folderName = params.folder_name
      const folderPath = path.join(folder, folderName)

      if (fs.existsSync(folderPath)) {
        throw new Error("Folder already exists")
      }

      fs.mkdirSync(folderPath)

      return folderPath
    })

    ipcMain.handle("folder:delete", async (event, params) => {
      const folderPath = params.folder_path

      if (!fs.existsSync(folderPath)) {
        throw new Error("Folder not found")
      }

      fs.rm(folderPath, { recursive: true, force: true }, (err) => {
        if (err) throw err
      })
    })

    ipcMain.handle("folder:rename", async (event, params) => {
      const oldPath = params.old_path
      const newPath = params.new_path

      if (fs.existsSync(newPath)) {
        throw new Error("Folder already exists")
      }

      fs.renameSync(oldPath, newPath, function (err) {
        if (err) throw err
      })
    })
  }

  fileTreeToObject = (fileTree) => {
    const fileTreeObject = {}
    const folderName = path.basename(fileTree.path)
    fileTreeObject.name = folderName
    fileTreeObject.path = fileTree.path
    fileTreeObject.items = []
    fileTreeObject.type = fileTree.type
    fileTree.items.forEach((item) => {
      if (item.type === "folder") {
        const folder = this.fileTreeToObject(item)
        fileTreeObject.items.push(folder)
      } else {
        const file = {
          name: item.name,
          path: item.path,
          type: item.type,
        }
        fileTreeObject.items.push(file)
      }
    })
    return fileTreeObject
  }

  initNotedFolder = (workspacePath) => {
    const notedFolderPath = path.join(workspacePath, ".noted")
    if (!fs.existsSync(notedFolderPath)) {
      fs.mkdirSync(notedFolderPath)
    }

    const settingsPath = path.join(notedFolderPath, "./settings.json")
    if (!fs.existsSync(settingsPath)) {
      fs.writeFileSync(settingsPath, JSON.stringify({}))
    }
  }
}

module.exports = Folders
