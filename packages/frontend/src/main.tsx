import { createRoot } from "react-dom/client";
import App from "./App";
import "@/styles/index.css";
import { setupConsole } from "./plugins/setupConsole";
import { setupHotModule } from "./plugins/setupHotModule";
import { setupLoading } from "./plugins/setupLoading";
import { setupNProgress } from "./plugins/setupNprogress";
import { setupRouter } from "./plugins/setupRouter";
import { setupDayjs } from "./plugins/setDayjs";
import { setUpAppUpdateNotification } from "./plugins/setUpAppUpdateNotification";

async function setupApp() {
  //初始状态loading
  setupLoading();
  //安装全局进度条
  setupNProgress();
  //安装路由
  await setupRouter();
  //热模块
  setupHotModule();
  //打印
  setupConsole();
  //设置国际化
  setupDayjs();
  //版本更新提示
  setUpAppUpdateNotification();

  const container = document.getElementById("root");
  if (!container) return;
  createRoot(container).render(<App />);
}

setupApp();
