import { createRoot } from "react-dom/client";
import { setupConsole, setupDayjs, setupHotModule, setupLoading, setupNProgress, setupRouter, setupAppUpdateNotification } from "./plugins";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";


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
  setupAppUpdateNotification();

  const container = document.getElementById("root");
  if (!container) return;
  createRoot(container).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

setupApp();
