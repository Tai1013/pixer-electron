<script setup lang="ts">
import { ref } from 'vue'

const results = ref<Record<string, any>>({})

const getAppInfo = async () => {
  const electronAPI = window.electronAPI
  if (electronAPI) {
    try {
      const appInfo = await electronAPI.getAppInfo()
      results.value['appInfo'] = appInfo
    }
    catch (error) {
      console.error('Failed to get app info:', error)
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- 標題欄 -->
    <div class="bg-white shadow-sm border-b border-gray-200 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">EP</span>
          </div>
          <h1 class="text-xl font-semibold text-gray-800">ElectronPixer</h1>
        </div>
      </div>
    </div>
    <!-- 主要內容 -->
    <div class="p-8">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            @click="getAppInfo">取得應用信息
          </button>
        </div>
        <!-- 結果顯示區域 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 執行結果 -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">執行結果</h3>
            <div class="bg-gray-900 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
              <div
                v-for="(result, key) in results"
                :key="key"
                class="mb-1">
                <h4 class="font-medium text-white mb-2">{{ key }}</h4>
                <pre class="text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">{{ JSON.stringify(result, null, 2) }}</pre>
              </div>
              <div v-if="Object.keys(results).length === 0" class="text-center text-gray-500 py-8">
                暫無執行結果
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
