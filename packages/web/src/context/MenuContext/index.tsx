import { createContext } from "react";
import { ItemType, MenuItemType } from "antd/lib/menu/interface";

export interface MenuContextValue {
  openKeys: string[];
  setOpenKeys: (openKeys: string[]) => void;
  items: ItemType<MenuItemType>[];
  handleMenuClick: (e: { key: string; keyPath: string[] }) => void;
  onMenuOpenChange: (openKeys: string[]) => void;
}

export const MenuContext = createContext<MenuContextValue>({
  openKeys: [],
  setOpenKeys: () => {},
  items: [],
  handleMenuClick: () => {},
  onMenuOpenChange: () => {},
});
