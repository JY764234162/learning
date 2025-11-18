import { createBrowserRouter, RouteObject, createHashRouter, createMemoryRouter, BlockerFunction, redirect } from "react-router-dom";
import { lazy } from "react";
import PageLayout from "../components/PageLayout";
import NotFound from "@/components/NotFound";
import ErrorElement from "./ErrorElement";
import { Layout } from "@/Layout";
// 1. 预先导入所有页面模块
const modules = import.meta.glob("../pages/**/index.tsx");

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
const getChildRoutes = (modules: Record<string, () => Promise<unknown>>) => {
  // 2. 创建路由配置
  Object.entries(modules).forEach(([path, module], index) => {
    const pathList = path.split("/");
    const routePath = pathList[pathList.length - 2];
    console.log(path, pathList, routePath);
    // 使用 TypeScript 类型断言来处理模块类型
    const Component = lazy(module as any);
    if (index === 0) {
      initRoutes[0].children?.push({
        index: true,
        loader: async () => {
          return redirect(routePath);
        },
      });
    }
    initRoutes[0].children?.push({
      path: routePath,
      element: (
        <PageLayout>
          <Component />
        </PageLayout>
      ),
      errorElement: <ErrorElement />,
    });
  });
};

getChildRoutes(modules);
console.log(initRoutes);
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
