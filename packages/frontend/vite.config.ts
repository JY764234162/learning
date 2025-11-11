import path from "path";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import dynamicImport from "vite-plugin-dynamic-import";
import tailwindcss from "@tailwindcss/vite";

import vitePluginResourceClassification from "./custom-vite-plugins/vite-plugin-resource-classification";
import { getBuildTime, setHtmlBuildTimePlugin } from "./custom-vite-plugins/buildTime";
// https://vitejs.dev/config/
export default defineConfig((configEnv: UserConfig) => {
  const buildTime = getBuildTime();

  return {
    plugins: [react(), Inspect(), dynamicImport(), vitePluginResourceClassification(), tailwindcss(), setHtmlBuildTimePlugin(buildTime)],
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
    base: "/learning/",
    assetsInclude: ["**/*.gltf"],
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
    },
    build: {
      manifest: true,
      emptyOutDir: true,
      outDir: "../../docs",
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "./index.html"),
        },
      },
      //cssnano
      cssMinify: true,
    },
  };
});
