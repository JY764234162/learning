//动态导入映射关系
export const dynamicLazyMap: Record<string, () => Promise<any>> = {
  //canvas
  "canvas-color-analyzer": () => import("@/pages/canvas/canvas-color-analyzer"),
  "canvas-pixelation": () => import("@/pages/canvas/canvas-pixelation"),
  "canvas-watermark": () => import("@/pages/canvas/canvas-watermark"),
  //component
  bezierTabs: () => import("@/pages/component/bezierTabs"),
  "color-thief": () => import("@/pages/component/color-thief"),
  cron: () => import("@/pages/component/cron"),
  "darg-upload": () => import("@/pages/component/darg-upload"),
  "drag-list": () => import("@/pages/component/drag-list"),
  "drag-sort": () => import("@/pages/component/drag-sort"),
  "export-html": () => import("@/pages/component/export-html"),
  "html-to-image": () => import("@/pages/component/html-to-image"),
  "keyword-high-light": () => import("@/pages/component/keyword-high-light"),
  lazyImage: () => import("@/pages/component/lazyImage"),
  preLoad: () => import("@/pages/component/preLoad"),
  progressiveImg: () => import("@/pages/component/progressiveImg"),
  resume: () => import("@/pages/component/resume"),
  "scroll-horizontal": () => import("@/pages/component/scroll-horizontal"),
  scrollAndHighlight: () => import("@/pages/component/scrollAndHighlight"),
  "string-diff": () => import("@/pages/component/string-diff"),
  treeEditor: () => import("@/pages/component/treeEditor"),
  "xml-parser": () => import("@/pages/component/xml-parser"),
  "auto-height-modal": () => import("@/pages/component/auto-height-modal"),
  //css
  "css-filter": () => import("@/pages/css/css-filter"),
  "oracle-font": () => import("@/pages/css/oracle-font"),
  //lib
  "floating-ui": () => import("@/pages/lib/floating-ui"),
  "leaflet-map": () => import("@/pages/lib/leaflet-map"),
  microapp: () => import("@/pages/lib/microapp"),
  "monaco-react": () => import("@/pages/lib/monaco-react"),
  "pdf-preview": () => import("@/pages/lib/pdf-preview"),
  previewWord: () => import("@/pages/lib/previewWord"),
  state: () => import("@/pages/lib/state"),
  threejs: () => import("@/pages/lib/threejs"),
  "react-flow": () => import("@/pages/lib/react-flow"),
  //origin
  "error-boundary": () => import("@/pages/origin/error-boundary"),
  notification: () => import("@/pages/origin/notification"),
  strictMode: () => import("@/pages/origin/strictMode"),
  suspense: () => import("@/pages/origin/suspense"),
  useSyncExternalStore: () => import("@/pages/origin/useSyncExternalStore"),
  //other
  "vite-hmr": () => import("@/pages/other/vite-hmr"),
  websocket: () => import("@/pages/other/websocket"),
  //svg
  drawSvg: () => import("@/pages/svg/drawSvg"),
  svgIcon: () => import("@/pages/svg/svgIcon"),

  //
  ai: () => import("@/pages/ai"),
  about: () => import("@/pages/about"),

  
};
