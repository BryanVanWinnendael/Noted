import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "node:path";
import Updates from "./update";
import Files from "./file";
import Folders from "./folder";
import Themes from "./theme";
import { autoUpdater } from "electron-updater";

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;
autoUpdater.setFeedURL({
  provider: "github",
  owner: "Bryan Van Winnendael",
  repo: "Noted",
  token: import.meta.env.VITE_GITHUB_TOKEN,
});

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("write-noted", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("write-noted");
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 500,
    minWidth: 550,
    frame: false,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
    backgroundMaterial: "acrylic",
  });

  !app.isPackaged && win.webContents.openDevTools();
  win.setMenu(null);

  const updater = new Updates(win);
  updater.handle();

  const theme = new Themes(win);
  theme.handle();

  const files = new Files(win);
  files.handle();

  const folders = new Folders(win);
  folders.handle();

  ipcMain.handle("platform:get", async () => {
    return process.platform;
  });

  ipcMain.handle("change-material", async (_, material) => {
    win?.setBackgroundMaterial(material);
  });

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url); // Open URL in user's browser.
    return { action: "deny" }; // Prevent the app from opening the URL.
  });

  ipcMain.handle("minimize-window", async () => {
    win?.minimize();
  });

  ipcMain.handle("maximize-window", async () => {
    if (win?.isMaximized()) {
      win.unmaximize();
    } else {
      win?.maximize();
    }
  });

  ipcMain.handle("close-window", async () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  ipcMain.handle("openBrowser", async (_, link) => {
    shell.openExternal(link);
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (_, commandLine) => {
    if (win) {
      const deepLink = commandLine.find((arg) =>
        arg.startsWith("write-noted://"),
      );
      win.webContents.send("token", deepLink);
      const token = deepLink?.split("write-noted://")[1];

      if (win.isMinimized()) win.restore();
      win.focus();

      win.webContents.send("token", token);
    }
  });

  app.whenReady().then(() => {
    createWindow();
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
