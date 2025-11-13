import { extend } from "dayjs";
import localeData from "dayjs/plugin/localeData";

import { locale } from "dayjs";

import "dayjs/locale/zh-cn";
import "dayjs/locale/en";

/**
 * Set dayjs locale
 *
 * @param lang
 */
export function setDayjsLocale(lang: "en-US" | "zh-CN" = "zh-CN") {
  const localMap = {
    "en-US": "en",
    "zh-CN": "zh-cn",
  };

  const l: "en-US" | "zh-CN" = lang || localStorage.getItem("lang") || "zh-CN";

  locale(localMap[l]);
}

export function setupDayjs() {
  extend(localeData);

  setDayjsLocale();
}
