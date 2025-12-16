import { createElement } from "react";
import { dynamicLazyMap } from "@/router/imports";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { redirect, RouteObject } from "react-router-dom";
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
  AppstoreOutlined,
  InteractionOutlined,
  FileTextOutlined,
  CodeOutlined,
  ToolOutlined,
  ApiOutlined,
  HomeOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

// Icon 映射表 - 将字符串标识符映射到组件
export const iconMap: Record<string, React.ComponentType<any>> = {
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
  AppstoreOutlined,
  InteractionOutlined,
  FileTextOutlined,
  CodeOutlined,
  ToolOutlined,
  ApiOutlined,
  HomeOutlined,
  PlayCircleOutlined,
};

// 反序列化路由 - 将字符串标识符转换回 icon 组件
export const deserializeRoutes = (routes: ElegantConstRoute[]): ElegantConstRoute[] => {
  return routes.map((route) => {
    const deserializedRoute: ElegantConstRoute = {
      ...route,
      handle: route.handle
        ? {
            ...route.handle,
            icon: typeof route.handle.icon === "string" && iconMap[route.handle.icon] ? iconMap[route.handle.icon] : route.handle.icon,
          }
        : undefined,
      children: route.children ? deserializeRoutes(route.children) : undefined,
    };
    return deserializedRoute;
  });
};

//转化ElegantConstRoute到RouteObject
export const transformToReactRoutes: (route: ElegantConstRoute[]) => RouteObject[] = (routes) => {
  // 确保路由已反序列化
  const deserializedRoutes = deserializeRoutes(routes);
  const result: RouteObject[] = [];
  deserializedRoutes.forEach((item, index) => {
    if (index === 0) {
      result.push({
        index: true,
        loader: () => redirect(item.path),
      });
    }
    if (item.path) {
      result.push({
        path: item.path,
        lazy: dynamicLazyMap?.[item.path],
        children: item?.children ? transformToReactRoutes(item.children) : [],
        handle: item.handle,
      });
    } else {
      result.push({ ...item });
    }
    return result;
  });

  return result;
};

//转化为菜单结构
export const transformToMenuItems: (route: ElegantConstRoute[]) => ItemType<MenuItemType>[] = (routes) => {
  // 确保路由已反序列化
  const deserializedRoutes = deserializeRoutes(routes);
  return deserializedRoutes.map((item) => {
    const icon = item?.handle?.icon ? createElement(item.handle?.icon) : null;
    return {
      key: item.path,
      label: item.handle.menuTitle,
      icon,
      children: item?.children ? transformToMenuItems(item.children) : undefined,
    };
  });
};

//转化为可搜索的菜单结构（所有叶子结点）
export const transformMenuToSearchMenus = (
  route: ElegantConstRoute[],
  parentPath: string = "",
  result: Array<{ route: ElegantConstRoute; fullPath: string }> = []
): Array<{ route: ElegantConstRoute; fullPath: string }> => {
  if (!route || route.length === 0) return result;

  // 确保路由已反序列化
  const deserializedRoutes = deserializeRoutes(route);

  deserializedRoutes.forEach((item) => {
    const currentPath = parentPath ? `${parentPath}/${item.path}` : `/${item.path}`;
    if (!item.children || item.children.length === 0) {
      // 叶子节点，添加到结果
      result.push({
        route: item,
        fullPath: currentPath,
      });
    } else {
      // 有子节点，递归处理
      transformMenuToSearchMenus(item.children, currentPath, result);
    }
  });
  return result;
};

// 根据 key 查找完整路径，如果是有子菜单的父级菜单，返回第一个子菜单的路径
export const findFullPathByKey = (routes: ElegantConstRoute[], targetKey: string, parentPath: string = ""): string | null => {
  // 确保路由已反序列化（虽然这里不需要 icon，但为了保持一致性）
  const deserializedRoutes = deserializeRoutes(routes);

  for (const route of deserializedRoutes) {
    const currentPath = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`;
    // 如果当前路由的 path 匹配 targetKey
    if (route.path === targetKey) {
      // 如果这个路由有子菜单，返回第一个子菜单的路径
      if (route.children && route.children.length > 0) {
        const firstChild = route.children[0];
        return `${currentPath}/${firstChild.path}`;
      }
      // 否则返回当前路径
      return currentPath;
    }
    // 如果有子路由，递归查找
    if (route.children && route.children.length > 0) {
      const childPath = findFullPathByKey(route.children, targetKey, currentPath);
      if (childPath) {
        return childPath;
      }
    }
  }
  return null;
};
