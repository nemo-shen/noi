import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@noi/core': resolve(__dirname, 'packages/core/index.ts'),
    },
  },
  optimizeDeps: {
    include: ['@vueuse/core', '@vueuse/motion'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})
