import path from "path";
import { defineConfig, PreviewOptions } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import myExample from "./custom-rollup-plugins/custom-rollup-plugin";
import dynamicImport from "vite-plugin-dynamic-import";
import gltf from "vite-plugin-gltf";
import { draco } from "@gltf-transform/functions";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Inspect(),
    dynamicImport(),
    gltf({
      transforms: [draco()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: { exclude: ["latex.js"] },
  server: {
    open: true,
    hmr: {
      // 配置 HMR 连接
      host: "localhost",
      port: 3000,
    },
  },
  base: "./",
  build: {
    outDir: "../../docs",
    rollupOptions: {
      plugins: [myExample()],
    },
    //cssnano
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
