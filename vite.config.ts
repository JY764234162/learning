import path from "path";
import { defineConfig, PreviewOptions } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import myExample from "./custom-rollup-plugins/custom-rollup-plugin";
import dynamicImport from "vite-plugin-dynamic-import";
const a: PreviewOptions = {};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Inspect(), dynamicImport()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: { exclude: ["latex.js"] },
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    hmr: {
      // 配置 HMR 连接
      host: "localhost",
      port: 3000,
    },
  },
  base: "./",
  build: {
    outDir: "docs",
    rollupOptions: {
      plugins: [myExample()],
    },
  },
});
