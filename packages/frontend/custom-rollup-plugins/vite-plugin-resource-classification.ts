// @filename: vite-plugin-resource-classification
import { Plugin } from "vite";

/**
 *
 * @description   用于打包资源分类
 */
export default function vitePluginResourceClassification(): Plugin {
  const outputConfig = {
    // JS 文件
    entryFileNames: "[name]-[hash].js",
    // 代码块（动态导入）
    chunkFileNames: "assets/chunk/[name]-[hash].js",
    // 资源文件，比如图片、字体、css
    assetFileNames: (assetInfo) => {
      const ext = assetInfo.names?.[0].split(".").pop() || "";
      if (
        ["png", "jpg", "jpeg", "gif", "svg", "woff", "ttf", "css"].includes(ext)
      ) {
        return `assets/${ext}s/[name]-[hash][extname]`;
      }
      return `assets/other/[name]-[hash][extname]`;
    },
  };
  return {
    name: "vite-plugin-resource-classification",

    config: (config) => {
      if (!config.build?.rollupOptions?.output) {
        config.build!.rollupOptions!.output = outputConfig;
      } else {
        if (Array.isArray(config.build.rollupOptions.output)) {
          for (const index in config.build.rollupOptions.output) {
            config.build.rollupOptions.output[index] = {
              ...outputConfig,
              ...config.build.rollupOptions.output[index],
            };
          }
        } else {
          config.build.rollupOptions.output = {
            ...outputConfig,
            ...config.build.rollupOptions.output,
          };
        }
      }
    },
  };
}
