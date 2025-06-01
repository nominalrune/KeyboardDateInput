import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/KeyboardDateInput/',
  plugins: [
    react(),
  ],
  build:{
    outDir: 'docs',
    emptyOutDir: true,
    minify: true,
  }
})
