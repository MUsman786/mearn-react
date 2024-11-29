import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Backend server URL
        changeOrigin: true,             // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' prefix before forwarding
      },
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
