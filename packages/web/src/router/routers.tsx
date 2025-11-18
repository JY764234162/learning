import { createBrowserRouter, RouteObject, createHashRouter, createMemoryRouter, BlockerFunction, redirect } from "react-router-dom";
import { lazy } from "react";
import PageLayout from "../components/PageLayout";
import NotFound from "@/components/NotFound";
import ErrorElement from "./ErrorElement";
import { Layout } from "@/Layout";
// 1. 预先导入所有页面模块
const modules = import.meta.glob("../pages/*/index.tsx");

const initRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
// 2. 创建路由配置
const routes: RouteObject[] = Object.entries(modules).map(([path, module]) => {
  const pathList = path.split("/");
  const name = pathList[pathList.length - 2];
  const routePath = name === "home" ? "/" : name;
  // 使用 TypeScript 类型断言来处理模块类型
  const Component = lazy(module as any);

  // 为首页路由使用不同的布局
  if (name === "home") {
    return {
      path: routePath,
      element: <Component />,
    };
  }
  // 为其他路由添加通用布局
  return {
    path: routePath,
    element: (
      <PageLayout>
        <Component />
      </PageLayout>
    ),
    errorElement: <ErrorElement />,
  };
});
initRoutes.find((item) => item.path === "/")?.children?.push(...routes);

const historyCreatorMap = {
  hash: createHashRouter,
  history: createBrowserRouter,
  memory: createMemoryRouter,
};

type HistoryCreator = typeof historyCreatorMap;
export type Options = Parameters<HistoryCreator[Mode]>[1];

export type Mode = keyof HistoryCreator;
export interface RouterOptions {
  initRoutes: RouteObject[];
  mode?: Mode;
  opt?: Options;
}
const createRouter = ({ initRoutes, mode = "history", opt }: RouterOptions) => {
  const onBeforeRouteChange: BlockerFunction = ({ currentLocation, nextLocation, historyAction }) => {
    console.log("onBeforeRouteChange");
    window.NProgress?.start?.();

    return false;
  };
  const afterRouteChange = (state: any) => {
    console.log("afterRouteChange");
    if (state.navigation.state === "idle") {
      document.title = "React-Soybean";
      window.NProgress?.done?.();
    }
  };
  const reactRouter = historyCreatorMap[mode](initRoutes, opt);

  //清除之前的实例
  reactRouter.dispose();
  //前置守卫
  reactRouter.getBlocker("beforeGuard", onBeforeRouteChange);
  //绑定后置路由守卫事件
  reactRouter.subscribe(afterRouteChange);

  return reactRouter;
};
export const router = createRouter({
  initRoutes,
  mode: import.meta.env.VITE_ROUTE_MODE,
  opt: { basename: import.meta.env.VITE_BASENAME },
});
