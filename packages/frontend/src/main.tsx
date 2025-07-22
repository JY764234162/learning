import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
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

console.log(
  `%c${import.meta.env.VITE_APP_TITLE}%c江一`,
  "color: white; font-size: 12px; font-weight: bold; background: red; padding: 3px 5px;",
  "color: white; font-size: 12px; font-weight: bold; background: black; padding:3px 5px;"
);
