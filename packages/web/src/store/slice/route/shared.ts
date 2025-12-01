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
