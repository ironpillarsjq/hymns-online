import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import imageManifestPlugin from './vite-plugin-image-manifest.js'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    imageManifestPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'docs',
  }
})
