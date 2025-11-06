import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupConsole } from "./plugins/setupConsole";
import { setupHotModule } from "./plugins/setupHotModule";
import { setupLoading } from "./plugins/setupLoading";
import { setupNProgress } from "./plugins/setupNprogress";
import { setupRouter } from "./plugins/setupRouter";

function setupApp() {
  //初始状态loading
  setupLoading();
  //安装全局进度条
  setupNProgress();
  //安装路由
  setupRouter();
  //热模块
  setupHotModule();
  //打印
  setupConsole();

  const container = document.getElementById("root");
  if (!container) return;
  createRoot(container).render(<App />);
}

setupApp();
