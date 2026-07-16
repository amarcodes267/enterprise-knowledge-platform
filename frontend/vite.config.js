import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': 'http://localhost:5000',
      '/upload': 'http://localhost:5000',
      '/search': 'http://localhost:5000',
      '/health': 'http://localhost:5000',
      '/auth': 'http://localhost:5000'
    }
  }
})
