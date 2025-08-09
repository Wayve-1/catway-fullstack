import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import history from "connect-history-api-fallback";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    middlewareMode: false,
    fs: { strict: false },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
