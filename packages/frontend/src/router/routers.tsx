import { createBrowserRouter, RouteObject, createHashRouter, createMemoryRouter, BlockerFunction, redirect } from "react-router-dom";
import { lazy } from "react";
import PageLayout from "../components/PageLayout";
import First from "@/pages/layout/first";
import NotFound from "@/components/NotFound";
import ErrorElement from "@/components/ErrorElement";
// 1. 预先导入所有页面模块
const modules = import.meta.glob("../pages/*/index.tsx");

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
  } else if (name === "layout") {
    return {
      path: routePath,
      element: <Component />,
      children: [
        { index: true, loader: () => redirect("first") },
        {
          path: "first",
          children: [
            { index: true, loader: () => redirect("second") },
            {
              path: "second",
              element: <First></First>,
            },
          ],
        },
      ],
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

routes.push({
  path: "*",
  element: <NotFound />,
});

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
console.log(routes);
export const router = createRouter({
  initRoutes: routes,
  opt: { basename: import.meta.env.VITE_BASENAME },
});
