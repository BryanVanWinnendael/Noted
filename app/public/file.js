const { ipcMain, dialog } = require("electron")
const fs = require("fs")
const path = require("path")
const FileTree = require("./fileTree")

class Files {
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

    ipcMain.handle("file:open", async (event, params) => {
      const filePath = params.file_path
      const fileContent = fs.readFileSync(filePath, "utf8")
      const fileName = path.basename(filePath)

      return { filePath, fileName, fileContent }
    })

    ipcMain.handle("file:save", async (event, params) => {
      if (params.file_path) {
        fs.writeFile(params.file_path, params.file_content, function (err) {
          if (err) throw err
        })
        return "success"
      }
      return "error"
    })

    ipcMain.handle("folder:open", async (event, params) => {
      const folderPath = params.folder_path
      const fileTree = new FileTree(folderPath)

      fileTree.build()
      const fileTreeObject = this.fileTreeToObject(fileTree)
      return fileTreeObject
    })

    ipcMain.handle("file:settings-save", async (event, params) => {
      const workspacePath = params.workspace_path
      const settingsPath = path.join(workspacePath, ".noted/settings.json")
      if (!fs.existsSync(settingsPath)) this.initNotedFolder(workspacePath)

      fs.writeFile(settingsPath, params.settings, function (err) {
        if (err) throw this.initNotedFolder(workspacePath)
      })
    })

    ipcMain.handle("file:settings-get", async (event, params) => {
      const workspacePath = params.workspace_path
      const settingsPath = path.join(workspacePath, ".noted/settings.json")
      if (!fs.existsSync(settingsPath)) this.initNotedFolder(workspacePath)

      const settings = fs.readFileSync(settingsPath, "utf8")
      return settings
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

module.exports = Files
