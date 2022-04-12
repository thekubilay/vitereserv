import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve} = require('path');
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // server: {

  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
