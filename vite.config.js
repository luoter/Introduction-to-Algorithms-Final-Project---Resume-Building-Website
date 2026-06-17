import { defineConfig } from 'vite'
export default defineConfig({
  // 完整仓库名称，开头/ 结尾/ 必须保留
  base: '/Introduction-to-Algorithms-Final-Project---Resume-Building-Website/',
  build: {
    chunkSizeWarningLimit: 600 // 消除大包警告
  }
})
