import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // The WebGL globe is lazy-loaded as its own optional visual chunk.
    chunkSizeWarningLimit: 1020,
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
