const { app, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: isDev
      ? "./electron/logo-512.png"
      : `${path.join(__dirname, "../build/logo-512.png")}`,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) win.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit(); // macOs
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow(); // macOs
});
