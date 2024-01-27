const { ipcMain, dialog } = require("electron")
const fs = require("fs")
const path = require("path")

class Themes {
  win = null
  constructor(win) {
    this.win = win
  }

  handle() {
    ipcMain.handle("theme:open-file", async (event, params) => {
      const data = fs.readFileSync(params.filePath, "utf8", (err, data) => {
        if (err) {
          throw new Error("no file path")
        }

        try {
          const jsonData = JSON.parse(data)
          if (jsonData === undefined) {
            throw new Error("no file path")
          }
          return jsonData
        } catch (jsonError) {
          throw new Error("no file path")
        }
      })
      return data
    })

    ipcMain.handle("theme:save-file", async (event, params) => {
      if (params.file_path) {
        fs.writeFile(params.file_path, params.file_content, function (err) {
          if (err) throw err
          console.log("Saved!")
        })
        return "success"
      } else {
        throw new Error("no file path")
      }
    })

    ipcMain.handle("theme:export", async (event, params) => {
      const { canceled, filePath } = await dialog.showSaveDialog(this.win, {
        properties: ["openFile"],
        defaultPath: "~/Untitled",
        filters: [{ name: "json", extensions: ["json"] }],
      })
      if (canceled) {
        throw new Error("cancel")
      }
      fs.writeFile(filePath, params.file_content, function (err) {
        if (err) throw err
        console.log("Saved!")
      })
      return { filePath }
    })

    ipcMain.handle("theme:import", async (event) => {
      const { canceled, filePaths } = await dialog.showOpenDialog(this.win, {
        properties: ["openFile"],
        filters: [{ name: "json", extensions: ["json"] }],
      })
      if (canceled) {
        throw new Error("cancel")
      } else {
        const data = fs.readFileSync(filePaths[0], "utf8", (err, data) => {
          if (err) {
            throw new Error("error")
          }
          return JSON.parse(data)
        })

        return { filePath: filePaths[0], data }
      }
    })

    ipcMain.handle("theme:settings-save", async (event, params) => {
      const workspacePath = params.workspace_path
      const themesPath = path.join(workspacePath, ".noted/themes")
      if (!fs.existsSync(themesPath)) {
        fs.mkdirSync(themesPath)
      }
      const name = params.name

      const settingsPath = path.join(themesPath, `${name}.json`)
      fs.writeFile(settingsPath, params.theme, function (err) {
        if (err) throw err
      })
    })

    ipcMain.handle("theme:settings-get", async (event, params) => {
      const workspacePath = params.workspace_path
      const themesPath = path.join(workspacePath, ".noted/themes")
      if (!fs.existsSync(themesPath)) {
        fs.mkdirSync(themesPath)
        return {}
      }

      // get all files in the themes folder
      const files = fs.readdirSync(themesPath)
      const res = {}

      // get the content of each file and add it to the res object with the name of the file as key
      files.forEach((file) => {
        const data = fs.readFileSync(
          path.join(themesPath, file),
          "utf8",
          (err, data) => {
            if (err) {
              throw new Error("error")
            }
            return JSON.parse(data)
          },
        )
        res[file.replace(".json", "")] = data
      })

      return res
    })

    ipcMain.handle("theme:settings-delete", async (event, params) => {
      const workspacePath = params.workspace_path
      const themesPath = path.join(workspacePath, ".noted/themes")
      if (!fs.existsSync(themesPath)) {
        fs.mkdirSync(themesPath)
      }
      const name = params.name

      const settingsPath = path.join(themesPath, `${name}.json`)
      fs.unlinkSync(settingsPath)
    })
  }
}

module.exports = Themes
