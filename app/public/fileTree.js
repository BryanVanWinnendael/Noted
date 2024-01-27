const fs = require("fs")

const EXCLUDED_FOLDERS = [".git", ".noted"]

class FileTree {
  constructor(path, name = null) {
    this.path = path
    this.name = name
    this.type = "folder"
    this.items = []
  }

  build = () => {
    this.items = FileTree.readDir(this.path)
  }

  static readDir(path) {
    var fileArray = []

    fs.readdirSync(path).forEach((file) => {
      if (EXCLUDED_FOLDERS.includes(file)) return
      var fileInfo = new FileTree(`${path}\\${file}`, file)

      var stat = fs.statSync(fileInfo.path)

      if (stat.isDirectory()) {
        fileInfo.items = FileTree.readDir(fileInfo.path)
      }

      const isFolder = stat.isDirectory()
      fileInfo.type = isFolder ? "folder" : "file"

      fileArray.push(fileInfo)
    })
    return fileArray
  }
}

module.exports = FileTree
