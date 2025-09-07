// Electron API 類型聲明
export interface ElectronAPI {
  // 獲取應用信息
  getAppInfo: () => Promise<any>
}

// 擴展 Window 接口
declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}

export {}
