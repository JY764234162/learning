import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";

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

axios
  .get(
    "https://pic.rmb.bdstatic.com/bjh/news/426c6fafb8b351ae64ca1b080a39ec9c.jpeg",
    {
      responseType: "arraybuffer",
    }
  )
  .then((result) => {
    const blob = new Blob([result.data], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    console.log(url);
    document.appendChild(
      Object.assign(document.createElement("img"), {
        src: url,
      })
    );
  })
  .catch((err) => {});
