import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4444,
    proxy: {
      "/api": {
        target: "https://easykartbackendbyayush.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // strips `/api`,
      },
    },
  },
});
