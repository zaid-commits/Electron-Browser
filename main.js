import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Store from 'electron-store';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  // Open DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers
ipcMain.handle('load-url', async (event, url) => {
  await mainWindow.loadURL(url);
  return mainWindow.webContents.getURL();
});

ipcMain.handle('go-back', () => {
  if (mainWindow.webContents.canGoBack()) {
    mainWindow.webContents.goBack();
    return true;
  }
  return false;
});

ipcMain.handle('go-forward', () => {
  if (mainWindow.webContents.canGoForward()) {
    mainWindow.webContents.goForward();
    return true;
  }
  return false;
});

ipcMain.handle('refresh', () => {
  mainWindow.webContents.reload();
});

ipcMain.handle('get-history', () => {
  return store.get('history', []);
});

ipcMain.handle('add-to-history', (event, url) => {
  const history = store.get('history', []);
  history.unshift({ url, timestamp: Date.now() });
  store.set('history', history.slice(0, 100)); // Keep only the last 100 entries
});

ipcMain.handle('get-bookmarks', () => {
  return store.get('bookmarks', []);
});

ipcMain.handle('add-bookmark', (event, bookmark) => {
  const bookmarks = store.get('bookmarks', []);
  bookmarks.push(bookmark);
  store.set('bookmarks', bookmarks);
});

ipcMain.handle('remove-bookmark', (event, url) => {
  const bookmarks = store.get('bookmarks', []);
  const updatedBookmarks = bookmarks.filter(b => b.url !== url);
  store.set('bookmarks', updatedBookmarks);
});

ipcMain.handle('get-theme', () => {
  return store.get('theme', 'light');
});

ipcMain.handle('set-theme', (event, theme) => {
  store.set('theme', theme);
});