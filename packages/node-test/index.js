const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const fsExtra = require("fs-extra");
const path = require("path");

const filePath = path.resolve(__dirname, "babel.js");
const code = fsExtra.readFileSync(filePath, "utf-8");

const ast = babelParser.parse(code, {
  sourceType: "unambiguous", // 支持ESM和CJS
  plugins: ["jsx", "typescript"],
});

const esmDeps = [];
const cjsDeps = [];

traverse(ast, {
  ImportDeclaration(path) {
    // 提取ESModule的导入
    esmDeps.push(path.node.source.value);
  },

  CallExpression(path) {

    // 提取CommonJS require
    const callee = path.node.callee;
    if (
      callee.type === "Identifier" &&
      callee.name === "require" &&
      path.node.arguments.length === 1 &&
      path.node.arguments[0].type === "StringLiteral"
    ) {
      cjsDeps.push(path.node.arguments[0].value);
    }
  },
});
debugger
console.log("ESModule依赖:", esmDeps);
console.log("CommonJS依赖:", cjsDeps);
