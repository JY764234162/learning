// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
// 用来处理ts文件的解析
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/main.tsx",
  external: [/node_modules/],
  output: [
    {
      file: "dist/bundle.mjs",
      format: "esm",
      name: "test",
      assetFileNames: "[name]-[hash][extname]",
      sourcemap: true,
    },
    {
      file: "dist/bundle.cjs",
      format: "cjs",
    },
    {
      file: "dist/umd.js",
      format: "umd", // 这里就是定义输出格式为 UMD
      name: "jiangyi",
    },
    {
      file: "dist/iife.js",
      format: "iife", // 这里就是定义输出格式为 UMD
      name: "jianger",
    },
    {
      file: "dist/amd.js",
      format: "amd", // 这里就是定义输出格式为 UMD
    },
  ],
  plugins: [
    resolve(),
    json(),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // 处理这些类型的文件
      babelHelpers: "bundled", // 生成的代码打包在一起的方式
      include: ["src/**/*"], // 只转译你的源码
      exclude: "node_modules/**", // 排除依赖
      presets: [
        // "@babel/preset-react",
        "@babel/preset-env",
        // "@babel/preset-typescript",
      ],
    }),
    ,
    typescript({
      tsconfig: "tsconfig.json",
    }),
    postcss({
      extract: true, // 将 CSS 提取到单独的文件中
      minimize: true, // 压缩 CSS
      use: ["autoprefixer"], // 使用 autoprefixer 来添加浏览器前缀
    }),
  ],
});
