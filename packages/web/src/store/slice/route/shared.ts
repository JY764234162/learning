import { createElement } from "react";
import { dynamicLazyMap } from "@/router/imports";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { redirect, RouteObject } from "react-router-dom";

//转化ElegantConstRoute到RouteObject
export const transformToReactRoutes: (route: ElegantConstRoute[]) => RouteObject[] = (routes) => {
  const result: RouteObject[] = [];
  routes.forEach((item, index) => {
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
  // return routes.map((item) => {
  //   if (item.name) {
  //     return {
  //       path: item.path,
  //       id: item.name,
  //       lazy: dynamicLazyMap?.[item.name],
  //       children: item?.children ? transformToReactRoutes(item.children) : [],
  //       handle: item.meta,
  //     };
  //   } else {
  //     return item;
  //   }
  // });
};

//转化为菜单结构
export const transformToMenuItems: (route: ElegantConstRoute[]) => ItemType<MenuItemType>[] = (routes) => {
  return routes.map((item) => {
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
  
  route.forEach((item) => {
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
export const findFullPathByKey = (
  routes: ElegantConstRoute[],
  targetKey: string,
  parentPath: string = ""
): string | null => {
  for (const route of routes) {
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
