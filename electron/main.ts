import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

// 判斷是否為開發環境
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged

// 保持對窗口對象的全局引用，如果不這樣做，當 JavaScript 對象被垃圾回收時，窗口會自動關閉
let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // 出於安全考慮，禁用 node integration
      contextIsolation: true, // 啟用上下文隔離
      preload: path.join(__dirname, 'preload.js'), // 使用 preload 腳本
    },
    show: false, // 先不顯示窗口，等內容加載完成後再顯示
  })

  // 加載應用
  if (isDev) {
    // 開發環境：加載 Vite 開發服務器
    mainWindow.loadURL('http://localhost:5173')
    // 打開開發者工具
    mainWindow.webContents.openDevTools()
  } else {
    // 生產環境：加載打包後的文件
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

    // 當窗口準備好顯示時
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show()

      // 在開發環境中聚焦窗口
      if (isDev) {
        mainWindow.focus()
      }
    }
  })
}

// 當 Electron 完成初始化並準備創建瀏覽器窗口時調用此方法
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // 在 macOS 上，當點擊 dock 圖標並且沒有其他窗口打開時，通常會重新創建一個窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// IPC 處理器 - 應用信息
ipcMain.handle('get-app-info', () => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    platform: process.platform,
    arch: process.arch,
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node,
    chromeVersion: process.versions.chrome
  }
})