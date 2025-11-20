import { dynamicLazyMap } from "@/router/imports";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { RouteObject } from "react-router-dom";

//转化ElegantConstRoute到RouteObject
export const transformToReactRoutes: (route: ElegantConstRoute[]) => RouteObject[] = (routes) => {
  return routes.map((item) => {
    if (item.name) {
      return {
        path: item.path,
        id: item.name,
        lazy: dynamicLazyMap?.[item.name],
        children: item?.children ? transformToReactRoutes(item.children) : [],
        handle: item.meta,
      };
    } else {
      return item;
    }
  });
};

export const transformToMenuItems: (route: ElegantConstRoute[]) => ItemType<MenuItemType>[] = (routes) => {
  return routes.map((item) => {
    return {
      key: item.path,
      label: item.handle.menuTitle,
      children: item?.children ? transformToMenuItems(item.children) : undefined,
    };
  });
};
