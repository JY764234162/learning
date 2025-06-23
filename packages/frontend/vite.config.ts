import path from "path";
import { defineConfig, PreviewOptions } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import myExample from "./custom-rollup-plugins/custom-rollup-plugin";
import dynamicImport from "vite-plugin-dynamic-import";

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
    hmr: {
      // 配置 HMR 连接
      host: "localhost",
      port: 3000,
    },
  },
  base: "./",
  assetsInclude: ["**/*.gltf"],
  build: {
    emptyOutDir: true,
    outDir: "../../docs",
    rollupOptions: {
      output: {
        // JS 文件
        entryFileNames: "[name]-[hash].js",
        // 代码块（动态导入）
        chunkFileNames: "assets/chunk/[name]-[hash].js",
        // 资源文件，比如图片、字体、css
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.names?.[0].split(".").pop() || "";
          if (
            ["png", "jpg", "jpeg", "gif", "svg", "woff", "ttf", "css"].includes(
              ext
            )
          ) {
            return `assets/${ext}s/[name]-[hash][extname]`;
          }
          return `assets/other/[name]-[hash][extname]`;
        },
      },
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
