import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// base relativo para funcionar tanto na raiz quanto em subpasta (GitHub Pages de projeto)
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
