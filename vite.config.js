import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pdfManifestPlugin from './vite-plugin-pdf-manifest.js'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    pdfManifestPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'docs',  // 将输出目录改为 docs
    // 如果需要部署到 GitHub Pages，还需要设置正确的 base
    // base: '/your-repo-name/',
  }
})
