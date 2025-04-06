import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  root: 'src', // or wherever you mount Vue
  plugins: [vue()],
  build: {
    outDir: '../assets',
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'src/main.js'),
      },
      output: {
        entryFileNames: 'app.js',
        assetFileNames: 'style.css',
      },
    },
    emptyOutDir: false,
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
})