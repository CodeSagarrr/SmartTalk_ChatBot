import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    proxy : {
      "/api/user" : "https://smarttalk-chatbot-app.onrender.com"
    }
  },
  plugins: [react()],
})
