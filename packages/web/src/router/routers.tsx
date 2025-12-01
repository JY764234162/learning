import { createBrowserRouter, RouteObject, createHashRouter, createMemoryRouter, BlockerFunction, redirect } from "react-router-dom";
import { constantRoutes } from "./constantRoutes";

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
    // console.log("onBeforeRouteChange");
    window.NProgress?.start?.();

    return false;
  };
  const afterRouteChange = (state: any) => {
    // console.log("afterRouteChange");
    if (state.navigation.state === "idle") {
      const menuTitle = state.matches[state.matches.length - 1].route.handle?.menuTitle;
      if (menuTitle) document.title = menuTitle;

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
