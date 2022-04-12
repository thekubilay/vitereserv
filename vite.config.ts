import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve,path} = require('path');
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
