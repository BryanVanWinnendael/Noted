const { ipcMain } = require("electron")
const fs = require("fs")
const path = require("path")

class Files {
  win = null
  constructor(win) {
    this.win = win
  }

  handle() {
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

    ipcMain.handle("file:save-pdf", async (event, params) => {
      if (params.file_path) {
        const content = params.file_content
        const buffer = Buffer.from(content)
        fs.writeFile(params.file_path, buffer, function (err) {
          if (err) throw err
        })
        return "success"
      }
      return "error"
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

    ipcMain.handle("file:new", async (event, params) => {
      const folder = params.folder
      const fileName = params.file_name
      const filePath = path.join(folder, fileName)

      if (fs.existsSync(filePath)) {
        throw new Error("File already exists")
      }

      fs.writeFile(filePath, "", function (err) {
        if (err) throw err
      })

      return filePath
    })

    ipcMain.handle("file:delete", async (event, params) => {
      const filePath = params.file_path

      if (!fs.existsSync(filePath)) {
        throw new Error("File not found")
      }

      fs.unlinkSync(filePath)
    })

    ipcMain.handle("file:rename", async (event, params) => {
      const oldPath = params.old_path
      const newPath = params.new_path

      if (fs.existsSync(newPath)) {
        throw new Error("File already exists")
      }

      fs.renameSync(oldPath, newPath, function (err) {
        if (err) throw err
      })
    })
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
