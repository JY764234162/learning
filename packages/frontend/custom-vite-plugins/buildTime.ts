import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { Plugin } from "vite";

export function getBuildTime() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const buildTime = dayjs.tz(Date.now(), "Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");

  return buildTime;
}

export function setHtmlBuildTimePlugin(buildTime: string) {
  const plugin: Plugin = {
    apply: "build",
    name: "html-plugin",
    transformIndexHtml(html) {
      return html.replace("<head>", `<head>\n    <meta name="buildTime" content="${buildTime}">`);
    },
  };

  return plugin;
}
