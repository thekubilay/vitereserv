import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const {resolve} = require('path');
import path from 'path'

export default defineConfig({
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
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

  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
