import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  base: '/',  // 修改基础路径为根目录，与GitHub Pages部署配置匹配
  build: {
    outDir: 'dist',  // 构建输出目录
    assetsDir: 'assets',  // 静态资源目录
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // 新增配置以确保src/assets/img目录中的所有文件都被打包到dist/assets/img中
    assetsInclude: ['src/assets/img/**']
  }
})