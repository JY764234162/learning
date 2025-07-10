import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "off", // 关闭未使用变量检查
      "@typescript-eslint/no-explicit-any": "off", // 如果用 TypeScript，也关闭对应规则
      "@typescript-eslint/no-unused-vars": "off", // 这里要设为 off
      "react/react-in-jsx-scope": "off", // 关闭此规则
      "react/no-unknown-property": "off", // 关闭此规则
    },
    ignores: ["./public/**", "iconfont.js"],
  },
]);
