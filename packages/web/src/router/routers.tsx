import { createBrowserRouter, RouteObject, createHashRouter, createMemoryRouter, BlockerFunction, redirect } from "react-router-dom";

import { constantRoutes } from "./constantRoutes";
import { transformToReactRoutes } from "@/store/slice/route/shared";

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
    window.NProgress?.start?.();
    return false;
  };
  const afterRouteChange = (state: any) => {
    if (state.navigation.state === "idle") {
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
  initRoutes: constantRoutes,
  mode: import.meta.env.VITE_ROUTE_MODE,
  opt: { basename: import.meta.env.VITE_BASENAME },
});
