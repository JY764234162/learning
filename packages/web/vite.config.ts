import path from "path";
import { defineConfig, loadEnv, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import dynamicImport from "vite-plugin-dynamic-import";
import tailwindcss from "@tailwindcss/vite";
import svgSprite from "vite-plugin-svg-sprite";
import vitePluginResourceClassification from "./custom-vite-plugins/vite-plugin-resource-classification";
import { getBuildTime, setHtmlBuildTimePlugin } from "./custom-vite-plugins/buildTime";
import { setupProjectInfo } from "./custom-vite-plugins/info";
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  //加载对应环境的环境变量
  const env = loadEnv(mode, process.cwd(), "");
  const { VITE_BASENAME } = env;
  const buildTime = getBuildTime();

  return {
    plugins: [
      react(),
      Inspect(),
      dynamicImport(),
      vitePluginResourceClassification(),
      svgSprite({ symbolId: "icon-[name]-[hash]" }),

      tailwindcss(),
      setHtmlBuildTimePlugin(buildTime),
      setupProjectInfo(),
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
    base: VITE_BASENAME,
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
