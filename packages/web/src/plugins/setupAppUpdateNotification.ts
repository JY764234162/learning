import { Button } from "antd";
import { createElement } from "react";

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
export function setupAppUpdateNotification() {
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

      window.$notification?.open({
        btn: (() => {
          return createElement("div", { style: { display: "flex", gap: "12px", justifyContent: "end", width: "325px" } }, [
            createElement(
              Button,
              {
                key: "cancel",
                onClick() {
                  window.$notification?.destroy();
                },
              },
              "取消"
            ),
            createElement(
              Button,
              {
                key: "ok",
                onClick() {
                  location.reload();
                },
                type: "primary",
              },
              "确认"
            ),
          ]);
        })(),
        description: "版本更新，是否刷新页面?",
        message: "系统版本更新通知",
        onClose() {
          isShow = false;
        },
        duration: 20,
      });
    } catch {
      isShow = false;
    }
  };
  //绑定动态加载错误时弹窗提示版本更新
  // window.addEventListener("vite:preloadError", handleNotification);
  //绑定窗口切换到当前页面时提示版本更新
  document.addEventListener("visibilitychange", handleNotification);
}

