import { RouteObject } from "react-router-dom";
import { dynamicLazyMap } from "./imports";

//默认路由
export const constantRoutes: RouteObject[] = [
  {
    id: "layout",
    path: "/",
    lazy: dynamicLazyMap["layout"],
    children: [],
  },
  {
    id: "not-found",
    path: "*",
    lazy: dynamicLazyMap["not-found"],
  },
];

const createLeafRoute = (path: string) => {
  return {
    name: path,
    path: path,
  };
};

//没有lazy的路由，用于存储在store里，lazy不能序列化
export const authRoutes: ElegantConstRoute[] = [
  {
    name: "canvas",
    path: "canvas",
    children: [createLeafRoute("canvas-color-analyzer"), createLeafRoute("canvas-pixelation"), createLeafRoute("canvas-watermark")],
  },
  {
    name: "component",
    path: "component",
    children: [
      createLeafRoute("bezierTabs"),
      createLeafRoute("color-thief"),
      createLeafRoute("cron"),
      createLeafRoute("darg-upload"),
      createLeafRoute("drag-list"),
      createLeafRoute("drag-sort"),
      createLeafRoute("export-html"),
      createLeafRoute("html-to-image"),
      createLeafRoute("keyword-high-light"),
      createLeafRoute("lazyImage"),
      createLeafRoute("preLoad"),
      createLeafRoute("progressiveImg"),
      createLeafRoute("resume"),
      createLeafRoute("scroll-horizontal"),
      createLeafRoute("scrollAndHighlight"),
      createLeafRoute("string-diff"),
      createLeafRoute("treeEditor"),
      createLeafRoute("xml-parser"),
    ],
  },
  {
    name: "css",
    path: "css",
    children: [createLeafRoute("css-filter"), createLeafRoute("oracle-font")],
  },
  {
    name: "lib",
    path: "lib",
    children: [
      createLeafRoute("floating-ui"),
      createLeafRoute("leaflet-map"),
      createLeafRoute("microapp"),
      createLeafRoute("monaco-react"),
      createLeafRoute("pdf-preview"),
      createLeafRoute("previewWord"),
      createLeafRoute("state"),
      createLeafRoute("threejs"),
    ],
  },
  {
    name: "origin",
    path: "origin",
    children: [
      createLeafRoute("error-boundary"),
      createLeafRoute("notification"),
      createLeafRoute("strictMode"),
      createLeafRoute("suspense"),
      createLeafRoute("useSyncExternalStore"),
    ],
  },
  {
    name: "svg",
    path: "svg",
    children: [createLeafRoute("drawSvg"), createLeafRoute("svgIcon")],
  },
  {
    name: "other",
    path: "other",
    children: [createLeafRoute("vite-hmr"), createLeafRoute("websocket")],
  },
];
