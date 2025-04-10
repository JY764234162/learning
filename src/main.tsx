import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import eruda from "eruda";

eruda.init();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// 确保只创建一次 root
const root = createRoot(rootElement);
root.render(<App />);

if (import.meta.hot) {
  //用于热更新时通信，在模块热更新时触发事件

  import.meta.hot.accept((newModule) => {
    // newModule is undefined when SyntaxError happened
    console.log("updated: count is now ", newModule);
  });
}
