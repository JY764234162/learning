import { RouteObject } from "react-router-dom";
import { Layout } from "@/Layout";
import {
  AndroidOutlined,
  AppleOutlined,
  ChromeOutlined,
  EditOutlined,
  EnvironmentOutlined,
  FileMarkdownOutlined,
  JavaScriptOutlined,
  OpenAIOutlined,
  SearchOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { NotFound } from "@/components/NotFound";
//默认路由
export const constantRoutes: RouteObject[] = [
  {
    id: "layout",
    path: "/",
    Component: Layout,
    children: [],
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
  {
    path: "canvas",
    handle: {
      menuTitle: "canvas画布",
      icon: AndroidOutlined,
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
    ],
  },
  {
    path: "component",
    handle: {
      menuTitle: "组件封装",
      icon: JavaScriptOutlined,
    },
    children: [
      createLeafRoute("bezierTabs", {
        menuTitle: "贝塞尔曲线Tabs",
        keyWords: ["贝塞尔曲线", "组件"],
      }),
      createLeafRoute("color-thief", {
        menuTitle: "图片主题色提取",
        keyWords: ["图片", "颜色", "主题色"],
      }),
      createLeafRoute("cron", {
        menuTitle: "Cron计时器组件",
        keyWords: ["cron", "组件", "任务"],
      }),
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
      createLeafRoute("export-html", {
        menuTitle: "导出html",
        keyWords: ["导出", "html"],
      }),
      createLeafRoute("html-to-image", {
        menuTitle: "html导出为图片",
        keyWords: ["导出", "图片", "html"],
      }),
      createLeafRoute("keyword-high-light", {
        menuTitle: "关键词高亮算法",
        keyWords: ["高亮", "算法", "关键词"],
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
      createLeafRoute("resume", {
        menuTitle: "简历",
      }),
      createLeafRoute("scroll-horizontal", {
        menuTitle: "水平滚动",
      }),
      createLeafRoute("scrollAndHighlight", {
        menuTitle: "滚动指定位置高亮",
      }),
      createLeafRoute("string-diff", {
        menuTitle: "字符串diff比对",
      }),
      createLeafRoute("treeEditor", {
        menuTitle: "Tree组件编辑器",
      }),
      createLeafRoute("xml-parser", {
        menuTitle: "xml解析渲染",
      }),
      createLeafRoute("auto-height-modal", {
        menuTitle: "自适应高度弹窗",
      }),
    ],
  },
  {
    path: "css",
    handle: {
      menuTitle: "CSS相关",
      icon: ChromeOutlined,
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
  {
    path: "lib",
    handle: {
      menuTitle: "库相关",
      icon: EditOutlined,
    },
    children: [
      createLeafRoute("floating-ui", {
        menuTitle: "悬浮",
      }),
      createLeafRoute("leaflet-map", {
        menuTitle: "地图",
      }),
      createLeafRoute("microapp", {
        menuTitle: "微应用",
      }),
      createLeafRoute("monaco-react", {
        menuTitle: "monaco编辑器",
      }),
      createLeafRoute("pdf-preview", {
        menuTitle: "pdf预览",
      }),
      createLeafRoute("previewWord", {
        menuTitle: "word预览",
      }),
      createLeafRoute("state", {
        menuTitle: "状态管理",
      }),
      createLeafRoute("threejs", {
        menuTitle: "3D渲染",
      }),
      createLeafRoute("react-flow", {
        menuTitle: "react-flow流程图",
      }),
    ],
  },
  {
    path: "origin",
    handle: {
      menuTitle: "原生相关",
      icon: AppleOutlined,
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
  {
    path: "svg",
    handle: {
      menuTitle: "svg",
      icon: TransactionOutlined,
    },
    children: [
      createLeafRoute("drawSvg", {
        menuTitle: "Svg绘画",
        icon: EnvironmentOutlined,
      }),
      createLeafRoute("svgIcon", {
        menuTitle: "封装svgIcon",
      }),
    ],
  },
  {
    path: "other",
    handle: {
      menuTitle: "其他",
      icon: SearchOutlined,
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
  {
    path: "ai",
    handle: {
      menuTitle: "AI对话",
      icon: OpenAIOutlined,
    },
  },
  {
    path: "about",
    handle: {
      menuTitle: "关于",
      icon: FileMarkdownOutlined,
    },
  },
];
