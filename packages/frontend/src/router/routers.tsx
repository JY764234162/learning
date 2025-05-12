import { useRoutes, Navigate } from "react-router";
import React, { Suspense } from "react";
import Loading from "../components/Loading";
import PageLayout from "../components/PageLayout";

// 1. 预先导入所有页面模块
const modules = import.meta.glob("../pages/*/index.tsx", {
  eager: true, // 立即加载所有模块
});

// 2. 创建路由配置
const routes = Object.entries(modules).map(([path, module]) => {
  const pathList = path.split("/");
  const name = pathList[pathList.length - 2];
  const routePath = name === "home" ? "/" : name;

  // 使用 TypeScript 类型断言来处理模块类型
  const Component = (module as { default: React.ComponentType }).default;

  // 为首页路由使用不同的布局
  if (name === "home") {
    return {
      path: routePath,
      element: (
        <Suspense fallback={<Loading />}>
          <Component />
        </Suspense>
      ),
    };
  }

  // 为其他路由添加通用布局
  return {
    path: routePath,
    element: (
      <Suspense fallback={<Loading />}>
        <PageLayout>
          <Component />
        </PageLayout>
      </Suspense>
    ),
  };
});

// 3. 添加重定向和通配符路由
if (!Object.keys(modules).some((path) => path.includes("/home/index.tsx"))) {
  routes.push({
    path: "/",
    element: <Navigate to={routes[0].path} />,
  });
}

routes.push({
  path: "*",
  element: <Navigate to="/" replace />,
});

const Routes = () => {
  const routers = useRoutes(routes);
  return routers;
};

export default Routes;
