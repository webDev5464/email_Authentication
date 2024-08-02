import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dotenv from 'dotenv'
// dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api": {
        // target: "http://localhost:1919",
        // target: process.env.server,
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
