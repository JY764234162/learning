import React from "react";
import { DiffEditor, loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

loader.init();

export const Component = () => {
  // 原始代码（左侧）
  const originalCode = `// 原始代码示例
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

const products = [
  { name: "商品A", price: 100 },
  { name: "商品B", price: 200 },
  { name: "商品C", price: 150 }
];

const result = calculateTotal(products);
console.log("总价:", result);

// 用户信息处理
function getUserInfo(userId) {
  const user = {
    id: userId,
    name: "张三",
    email: "zhangsan@example.com"
  };
  return user;
}`;

  // 修改后的代码（右侧）
  const modifiedCode = `// 优化后的代码示例
function calculateTotal(items) {
  // 使用 reduce 方法简化代码
  return items.reduce((sum, item) => sum + item.price, 0);
}

const products = [
  { name: "商品A", price: 100 },
  { name: "商品B", price: 200 },
  { name: "商品C", price: 150 },
  { name: "商品D", price: 80 }  // 新增商品
];

const result = calculateTotal(products);
console.log("总价:", result);

// 用户信息处理 - 添加了类型检查
function getUserInfo(userId) {
  if (!userId) {
    throw new Error("用户ID不能为空");
  }
  
  const user = {
    id: userId,
    name: "张三",
    email: "zhangsan@example.com",
    role: "admin"  // 新增角色字段
  };
  return user;
}`;

  return (
    <DiffEditor
      height="90vh"
      language="javascript"
      original={originalCode}
      modified={modifiedCode}
      options={{
        readOnly: false,
        renderSideBySide: true,
        enableSplitViewResizing: true,
        renderOverviewRuler: true,
        minimap: { enabled: true },
        fontSize: 14,
        wordWrap: "on",
      }}
    />
  );
};
