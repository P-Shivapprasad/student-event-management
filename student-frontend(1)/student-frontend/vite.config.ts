
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 5173,
    proxy: {
      // All requests starting with /api/students → student-service (port 8081)
      '/api/students': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
      // All requests starting with /api/events → event-service (port 8082)
      '/api/events': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})