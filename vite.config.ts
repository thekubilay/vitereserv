import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve} = require('path');
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // server: {
  //   host: true,
  //   // host: "localhost", // local
  //   port: 3000,
  //   open: false,
  //   watch: {
  //     usePolling: true,
  //     disableGlobbing: false,
  //   },
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
