import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import { htmlInjectionPlugin } from "./vite-plugins/html-inject";
import myExample from "./custom-rollup-plugins/custom-rollup-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Inspect(),
    htmlInjectionPlugin({
      // example injections
      injections: [
        {
          // (optional) injection name
          name: "Open Graph",
          // path to the code snippet file relative to Vite project root
          path: "./index.html",
          // (optional) code snippet type: raw | js | css
          type: "raw",
          // where to inject: head | body | head-prepend | body-prepend
          injectTo: "head",
          // (optional) which modes apply to: dev | prod | both
          buildModes: "both",
        },
      ],
    }),
    {
      name: "hmr-communication",
      configureServer(server) {
        server.ws.on("vite:from-client", (data, client) => {
          console.log("收到客户端消息:", data.msg);
          // 发送响应回客户端
          client.send("vite:from-server", {
            msg: `服务器响应 [${new Date().toLocaleTimeString()}]: ${data.msg}`,
          });
        });
      },
    },
  ],
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
  build: {
    outDir: "docs",
    rollupOptions: {
      plugins: [myExample()],
    },
  },
});
