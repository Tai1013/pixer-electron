import { contextBridge, ipcRenderer } from 'electron'

// 暴露給渲染進程的 API
const electronAPI = {
  // 獲取應用信息
  getAppInfo: () => ipcRenderer.invoke('get-app-info')
}

// 使用 contextBridge 安全地暴露 API
contextBridge.exposeInMainWorld('electronAPI', electronAPI)
