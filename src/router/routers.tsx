import { useRoutes, Navigate } from "react-router";
import React, { Suspense } from "react";
import Loading from "../components/Loading";

// 使用 glob 获取所有页面的路径
const pagesPaths = Object.keys(import.meta.glob("@/pages/*/index.tsx"));

const Routes = () => {
  // 创建懒加载路由配置
  const routes = pagesPaths.map((path) => {
    const pathList = path.split("/");
    const name = pathList[pathList.length - 2];

    // 为home路由特殊处理，使其成为根路径
    const routePath = name === "home" ? "/" : name;

    return {
      path: routePath,
      element: (
        <Suspense fallback={<Loading />}>
          {React.createElement(
            React.lazy(() => import(/* @vite-ignore */ path))
          )}
        </Suspense>
      ),
    };
  });

  // 添加重定向到首页的路由(如果没有home页面的话)
  if (!pagesPaths.some((path) => path.includes("/home/index.tsx"))) {
    routes.push({
      path: "/",
      element: <Navigate to={routes[0].path} />,
    });
  }

  // 添加通配符路由，匹配所有未定义的路径
  routes.push({
    path: "*",
    element: <Navigate to="/" replace />,
  });

  const routers = useRoutes(routes);
  return routers;
};

export default Routes;
