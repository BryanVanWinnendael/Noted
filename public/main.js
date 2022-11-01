const { app, ipcMain, dialog, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
var fs = require('fs')
require('@electron/remote/main').initialize()

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 500,
    minWidth: 550,
    frame: false,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  })

  win.setMenu(null)
  win.loadURL(isDev 
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  )

  ipcMain.handle("minimize-window", async (event) => {
    win.minimize()
  })

  ipcMain.handle("maximize-window", async (event) => {
    if(win.isMaximized()){
      win.unmaximize()
    }else{
      win.maximize()
    }
  })

  ipcMain.handle("close-window", async (event, saved, fileName) => {
    if (fileName === '' || fileName === undefined) fileName = 'Untitled'
      
    var options = {
      type: 'warning',
      buttons: ['&Yes, close', '&No, don\'t close'],
      title: 'File not saved',
      normalizeAccessKeys: true,
      detail: 'Do you really want to close the application?',
      message: `File ${fileName} is not saved.`
    }

    if(saved){
      if (process.platform !== 'darwin') {
        app.quit()
      }
    }
    
    else {
      dialog.showMessageBox(win, options)
      .then((choice) => {
        console.log(choice.response)
        if (choice.response === 0) {
          app.quit()
        }
      }).catch(err => {
          console.log('ERROR', err)
      })
    }
  })

  ipcMain.handle("dialog:openTools", async (event) => {
    win.webContents.openDevTools({mode:'right'});
  })

  ipcMain.handle("dialog:openFile", async (event) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ['openFile'],
      filters: [
        { name: 'md', extensions: ['md'] },
      ]
    })
    if (canceled) {
      return
    } else {
      const content = fs.readFileSync(filePaths[0], "utf8", (err, data) => {
        if (err) {
            return
        }
        return data
      })

      const fileName = path.basename(filePaths[0])
      given_path = filePaths[0]
      return {content, filePath: filePaths[0], fileName}
    }
  })

  ipcMain.handle("saveFile", async (event, params) => {
    console.log(params.file_path)
    if(params.file_path){
      fs.writeFile(params.file_path, params.file_content, function (err) {
        if (err) throw err
        console.log('Saved!')
      })
      return 'success'
    }

    const { canceled, filePath  } = await dialog.showSaveDialog(win, {
      properties: ['openFile'],
      defaultPath: '~/Untitled',
      filters: [
        { name: 'md', extensions: ['md'] },
      ]
    })
    if (canceled) {
      throw 'cancel'
    }
    fs.writeFile(filePath, params.file_content, function (err) {
      if (err) throw err
      console.log('Saved!')
    }
    )
    const fileName = path.basename(filePath)
  
    return {filePath, fileName}
  })

}


app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})