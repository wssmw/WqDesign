import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // 设置@别名指向src目录
      'components': path.resolve(__dirname, './src/components')  // 设置components别名
    },
    extensions: ['.js', '.vue', '.json']  // 自动解析的扩展名
  },
})
