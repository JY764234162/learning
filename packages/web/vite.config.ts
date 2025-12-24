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
import { visualizer } from "rollup-plugin-visualizer";
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
      visualizer({ open: true }),
      setHtmlBuildTimePlugin(buildTime),
      setupProjectInfo(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ["latex.js"],
      // 预构建优化
      include: ["react", "react-dom", "react-router-dom", "antd"],
      // 强制预构建某些大型库
      force: false,
    },
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
      // 启用压缩
      minify: "terser",
      // 代码分割优化
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "./index.html"),
          404: path.resolve(__dirname, "./404.html"),
        },
        // output: {
        //   // 手动代码分割，将大型库单独打包
        //   manualChunks: (id) => {
        //     // node_modules 中的依赖
        //     if (id.includes("node_modules")) {
        //       // React 相关
        //       if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
        //         return "vendor-react";
        //       }
        //       // Ant Design 相关
        //       if (id.includes("antd") || id.includes("@ant-design")) {
        //         return "vendor-antd";
        //       }

        //       // Three.js 相关 - 3D 库，单独打包
        //       if (id.includes("three") || id.includes("@react-three")) {
        //         return "vendor-three";
        //       }
        //       // PDF.js - PDF 预览库，单独打包
        //       if (id.includes("pdfjs-dist")) {
        //         return "vendor-pdf";
        //       }
        //       // 其他大型库
        //       if (id.includes("wavesurfer") || id.includes("leaflet") || id.includes("@xyflow")) {
        //         return "vendor-libs";
        //       }
        //       // 其他 node_modules 依赖
        //       return "vendor";
        //     }
        //   },
        //   // 优化 chunk 大小警告
        //   chunkSizeWarningLimit: 1000,
        // },
      },
      // CSS 压缩
      cssMinify: true,
      // 启用 sourcemap（生产环境可以关闭以减小体积）
      sourcemap: false,
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 目标浏览器，更现代的浏览器可以减小体积
      target: ["es2015", "edge88", "firefox78", "chrome87", "safari14"],
    },
  };
});
