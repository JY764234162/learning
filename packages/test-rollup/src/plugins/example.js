// @filename: rollup-plugin-my-example.js
export default function myExample() {
  return {
    name: "my-example", // 此名称将出现在警告和错误中
    version: "1.0.0",
    resolveId(source) {
      if (source === "virtual-module") {
        // 这表示 rollup 不应询问其他插件或
        // 从文件系统检查以找到此 ID
        return source;
      }
      return null; // 其他ID应按通常方式处理
    },
    load(id) {
      if (id === "virtual-module") {
        // "virtual-module"的源代码
        return 'export default "This is virtual!"';
      }
      return null; // 其他ID应按通常方式处理
    },
  };
}
