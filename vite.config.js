import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// /api bilan boshlanadigan so'rovlar Python serverga yo'naltiriladi.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
})
