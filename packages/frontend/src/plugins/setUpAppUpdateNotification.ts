import { Button } from "antd";
import { createElement } from "react";

export function setUpAppUpdateNotification() {
  let isShow = false;

  const handleNotification = async () => {
    //未弹窗、切换到tab可视窗口、生产环境才触发
    const preConditions = [!isShow, document.visibilityState === "visible", !import.meta.env.DEV];
    if (!preConditions.every(Boolean)) return;

    isShow = true;
    try {
      const buildTime = await getHtmlBuildTime();
      console.log(buildTime, BUILD_TIME);
      if (buildTime === BUILD_TIME) {
        isShow = false;
        return;
      }

      window.$modal?.warning({
        content: "版本已更新，请刷新页面",
        title: "系统版本更新通知",
        onOk() {
          location.reload();
        },
        onCancel() {
          isShow = false;
        },
      });
    } catch {
      isShow = false;
    }
  };
  //绑定动态加载错误时弹窗提示版本更新
  window.addEventListener("vite:preloadError", handleNotification);
  //绑定窗口切换到当前页面时提示版本更新
  document.addEventListener("visibilitychange", handleNotification);
}

async function getHtmlBuildTime() {
  const res = await fetch(`${import.meta.env.VITE_BASENAME}index.html?time=${Date.now()}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  const html = await res.text();

  const match = html.match(/<meta name="buildTime" content="(.*)">/);

  const buildTime = match?.[1] || "";

  return buildTime;
}
