import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // Using relative paths for better compatibility across different hosting environments
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
