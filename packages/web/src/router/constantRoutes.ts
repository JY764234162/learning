import { RouteObject, redirect } from "react-router-dom";
import { Layout } from "@/Layout";
import { NotFound } from "@/components/NotFound";
//默认路由
export const constantRoutes: RouteObject[] = [
  {
    id: "login",
    path: "/login",
    lazy: () => import("@/pages/login"),
  },
  {
    id: "layout",
    path: "/",
    Component: Layout,
    children: [],
  },
  {
    id: "root-redirect",
    path: "/",
    loader: () => redirect("/home"),
  },
  {
    id: "not-found",
    path: "*",
    Component: NotFound,
  },
];

const createLeafRoute = (path: string, handle: Record<string, any>) => {
  return {
    path: path,
    handle,
  };
};

//没有lazy的路由，用于存储在store里，lazy不能序列化
export const authRoutes: ElegantConstRoute[] = [
  // ========== 首页 ==========
  {
    path: "home",
    handle: {
      menuTitle: "首页",
      icon: "HomeOutlined",
    },
  },
  // ========== UI组件 ==========
  {
    path: "ui",
    handle: {
      menuTitle: "UI组件",
      icon: "AppstoreOutlined",
    },
    children: [
      createLeafRoute("bezierTabs", {
        menuTitle: "贝塞尔曲线Tabs",
        keyWords: ["贝塞尔曲线", "组件"],
      }),
      createLeafRoute("auto-height-modal", {
        menuTitle: "自适应高度弹窗",
      }),
      createLeafRoute("treeEditor", {
        menuTitle: "Tree组件编辑器",
      }),
      createLeafRoute("cron", {
        menuTitle: "Cron计时器组件",
        keyWords: ["cron", "组件", "任务"],
      }),
    ],
  },
  // ========== 交互功能 ==========
  {
    path: "interaction",
    handle: {
      menuTitle: "交互功能",
      icon: "InteractionOutlined",
    },
    children: [
      createLeafRoute("darg-upload", {
        menuTitle: "拖拽上传",
        keyWords: ["拖拽", "api", "上传"],
      }),
      createLeafRoute("drag-list", {
        menuTitle: "拖拽列表",
        keyWords: ["拖拽", "api"],
      }),
      createLeafRoute("drag-sort", {
        menuTitle: "拖拽排序",
        keyWords: ["拖拽", "api", "排序"],
      }),
      createLeafRoute("scroll-horizontal", {
        menuTitle: "水平滚动",
      }),
      createLeafRoute("scrollAndHighlight", {
        menuTitle: "滚动指定位置高亮",
      }),
    ],
  },
  // ========== 图片处理 ==========
  {
    path: "image",
    handle: {
      menuTitle: "图片处理",
      icon: "FileTextOutlined",
    },
    children: [
      createLeafRoute("color-thief", {
        menuTitle: "图片主题色提取",
        keyWords: ["图片", "颜色", "主题色"],
      }),
      createLeafRoute("lazyImage", {
        menuTitle: "图片懒加载",
      }),
      createLeafRoute("preLoad", {
        menuTitle: "预加载",
      }),
      createLeafRoute("progressiveImg", {
        menuTitle: "渐进式图片加载",
      }),
    ],
  },
  // ========== 数据处理 ==========
  {
    path: "data",
    handle: {
      menuTitle: "数据处理",
      icon: "CodeOutlined",
    },
    children: [
      createLeafRoute("keyword-high-light", {
        menuTitle: "关键词高亮算法",
        keyWords: ["高亮", "算法", "关键词"],
      }),
      createLeafRoute("string-diff", {
        menuTitle: "字符串diff比对",
      }),
      createLeafRoute("export-html", {
        menuTitle: "导出html",
        keyWords: ["导出", "html"],
      }),
      createLeafRoute("html-to-image", {
        menuTitle: "html导出为图片",
        keyWords: ["导出", "图片", "html"],
      }),
      createLeafRoute("xml-parser", {
        menuTitle: "xml解析渲染",
      }),
    ],
  },
  // ========== 可视化 ==========
  {
    path: "visualization",
    handle: {
      menuTitle: "可视化",
      icon: "TransactionOutlined",
    },
    children: [
      createLeafRoute("canvas-color-analyzer", {
        menuTitle: "canvas颜色分析",
        keyWords: ["canvas", "颜色"],
      }),
      createLeafRoute("canvas-pixelation", {
        menuTitle: "canvas像素分析",
        keyWords: ["canvas", "像素", "颜色"],
      }),
      createLeafRoute("canvas-watermark", {
        menuTitle: "canvas生成水印",
        keyWords: ["canvas", "水印", "自定义"],
      }),
      createLeafRoute("drawSvg", {
        menuTitle: "Svg绘画",
      }),
      createLeafRoute("svgIcon", {
        menuTitle: "封装svgIcon",
      }),
      createLeafRoute("threejs", {
        menuTitle: "3D渲染",
      }),
      createLeafRoute("react-flow", {
        menuTitle: "react-flow流程图",
      }),
    ],
  },
  // ========== 编辑器 ==========
  {
    path: "editor",
    handle: {
      menuTitle: "编辑器",
      icon: "EditOutlined",
    },
    children: [
      createLeafRoute("monaco-react", {
        menuTitle: "monaco编辑器",
      }),
      createLeafRoute("rich-editor", {
        menuTitle: "富文本编辑器",
        keyWords: ["富文本", "编辑器", "contenteditable"],
      }),
      createLeafRoute("audio-editor", {
        menuTitle: "音频编辑器",
        keyWords: ["音频", "编辑器", "剪切", "wavesurfer"],
      }),
    ],
  },
  // ========== 文档预览 ==========
  {
    path: "document",
    handle: {
      menuTitle: "文档预览",
      icon: "FileTextOutlined",
    },
    children: [
      createLeafRoute("pdf-preview", {
        menuTitle: "pdf预览",
      }),
      createLeafRoute("word-preview", {
        menuTitle: "word预览",
      }),
    ],
  },
  // ========== 工具库 ==========
  {
    path: "library",
    handle: {
      menuTitle: "工具库",
      icon: "ToolOutlined",
    },
    children: [
      createLeafRoute("floating-ui", {
        menuTitle: "悬浮",
      }),
      createLeafRoute("leaflet-map", {
        menuTitle: "地图",
      }),
      createLeafRoute("state", {
        menuTitle: "状态管理",
      }),
      createLeafRoute("microapp", {
        menuTitle: "微应用",
      }),
    ],
  },
  // ========== React特性 ==========
  {
    path: "react",
    handle: {
      menuTitle: "React特性",
      icon: "AppleOutlined",
    },
    children: [
      createLeafRoute("error-boundary", {
        menuTitle: "错误边界",
      }),
      createLeafRoute("notification", {
        menuTitle: "浏览器级通知",
      }),
      createLeafRoute("strictMode", {
        menuTitle: "严格模式",
      }),
      createLeafRoute("suspense", {
        menuTitle: "异步组件",
      }),
      createLeafRoute("useSyncExternalStore", {
        menuTitle: "外部状态监控",
      }),
    ],
  },
  // ========== 样式 ==========
  {
    path: "style",
    handle: {
      menuTitle: "样式",
      icon: "ChromeOutlined",
    },
    children: [
      createLeafRoute("css-filter", {
        menuTitle: "cssFilter属性",
      }),
      createLeafRoute("oracle-font", {
        menuTitle: "甲骨文字体",
      }),
    ],
  },
  // ========== 开发工具 ==========
  {
    path: "devtools",
    handle: {
      menuTitle: "开发工具",
      icon: "ApiOutlined",
    },
    children: [
      createLeafRoute("vite-hmr", {
        menuTitle: "Vite热模块（本地）",
      }),
      createLeafRoute("websocket", {
        menuTitle: "实时通信（后端）",
      }),
    ],
  },
  // ========== 游戏 ==========
  {
    path: "game",
    handle: {
      menuTitle: "游戏",
      icon: "PlayCircleOutlined",
    },
    children: [
      createLeafRoute("poke", {
        menuTitle: "扑克游戏",
        keyWords: ["扑克", "游戏", "发牌"],
      }),
      createLeafRoute("plane-game", {
        menuTitle: "飞机大战",
        keyWords: ["飞机", "游戏", "射击"],
      }),
    ],
  },
  // ========== 其他 ==========
  {
    path: "other",
    handle: {
      menuTitle: "其他",
      icon: "SearchOutlined",
    },
    children: [
      createLeafRoute("resume", {
        menuTitle: "简历",
      }),
    ],
  },
  {
    path: "ai",
    handle: {
      menuTitle: "AI对话",
      icon: "OpenAIOutlined",
    },
  },
  {
    path: "about",
    handle: {
      menuTitle: "关于",
      icon: "FileMarkdownOutlined",
    },
  },
];
