//动态导入映射关系
export const dynamicLazyMap: Record<string, () => Promise<any>> = {
  // ========== UI组件 ==========
  bezierTabs: () => import("@/pages/ui/bezierTabs"),
  "auto-height-modal": () => import("@/pages/ui/auto-height-modal"),
  treeEditor: () => import("@/pages/ui/treeEditor"),
  cron: () => import("@/pages/ui/cron"),

  // ========== 交互功能 ==========
  "darg-upload": () => import("@/pages/interaction/darg-upload"),
  "drag-list": () => import("@/pages/interaction/drag-list"),
  "drag-sort": () => import("@/pages/interaction/drag-sort"),
  "scroll-horizontal": () => import("@/pages/interaction/scroll-horizontal"),
  scrollAndHighlight: () => import("@/pages/interaction/scrollAndHighlight"),

  // ========== 图片处理 ==========
  "color-thief": () => import("@/pages/image/color-thief"),
  lazyImage: () => import("@/pages/image/lazyImage"),
  preLoad: () => import("@/pages/image/preLoad"),
  progressiveImg: () => import("@/pages/image/progressiveImg"),

  // ========== 数据处理 ==========
  "keyword-high-light": () => import("@/pages/data/keyword-high-light"),
  "string-diff": () => import("@/pages/data/string-diff"),
  "export-html": () => import("@/pages/data/export-html"),
  "html-to-image": () => import("@/pages/data/html-to-image"),
  "xml-parser": () => import("@/pages/data/xml-parser"),

  // ========== 可视化 ==========
  "canvas-color-analyzer": () => import("@/pages/visualization/canvas-color-analyzer"),
  "canvas-pixelation": () => import("@/pages/visualization/canvas-pixelation"),
  "canvas-watermark": () => import("@/pages/visualization/canvas-watermark"),
  drawSvg: () => import("@/pages/visualization/drawSvg"),
  svgIcon: () => import("@/pages/visualization/svgIcon"),
  threejs: () => import("@/pages/visualization/threejs"),
  "react-flow": () => import("@/pages/visualization/react-flow"),

  // ========== 编辑器 ==========
  "monaco-react": () => import("@/pages/editor/monaco-react"),
  "rich-editor": () => import("@/pages/editor/rich-editor"),
  "audio-editor": () => import("@/pages/editor/audio-editor"),

  // ========== 文档预览 ==========
  "pdf-preview": () => import("@/pages/document/pdf-preview"),
  "word-preview": () => import("@/pages/document/word-preview"),

  // ========== 工具库 ==========
  "floating-ui": () => import("@/pages/library/floating-ui"),
  "leaflet-map": () => import("@/pages/library/leaflet-map"),
  state: () => import("@/pages/library/state"),
  microapp: () => import("@/pages/library/microapp"),

  // ========== React特性 ==========
  "error-boundary": () => import("@/pages/react/error-boundary"),
  notification: () => import("@/pages/react/notification"),
  strictMode: () => import("@/pages/react/strictMode"),
  suspense: () => import("@/pages/react/suspense"),
  useSyncExternalStore: () => import("@/pages/react/useSyncExternalStore"),

  // ========== 样式 ==========
  "css-filter": () => import("@/pages/style/css-filter"),
  "oracle-font": () => import("@/pages/style/oracle-font"),

  // ========== 开发工具 ==========
  "vite-hmr": () => import("@/pages/devtools/vite-hmr"),
  websocket: () => import("@/pages/devtools/websocket"),

  // ========== 游戏 ==========
  poke: () => import("@/pages/game/poke"),
  "plane-game": () => import("@/pages/game/plane-game"),

  // ========== 其他 ==========
  resume: () => import("@/pages/other/resume"),

  // ========== 顶级页面 ==========
  home: () => import("@/pages/home"),
  ai: () => import("@/pages/ai"),
  about: () => import("@/pages/about"),
};
