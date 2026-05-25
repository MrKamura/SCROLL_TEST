import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages: /имя-репозитория/ (задаётся в CI через VITE_BASE)
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
})
