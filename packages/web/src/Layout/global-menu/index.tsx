import { router } from "@/router/routers";
import { settingSlice } from "@/store/slice/setting";
import { Menu } from "antd";
import { MenuProps } from "antd/lib";
import { FC, memo, useCallback, useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { MenuContext } from "../context/MenuContext";

export const GlobalMenu: FC<MenuProps> = memo((props) => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const { openKeys, items, handleMenuClick, onMenuOpenChange } = useContext(MenuContext);
  const isVertical = settings.layout.mode === "vertical";
  const mode = isVertical ? "inline" : "horizontal";

  return (
    <Menu
      theme={settings.themeMode}
      mode={mode}
      items={items}
      selectedKeys={router.state.matches[router.state.matches.length - 1].pathname.split("/")}
      onClick={handleMenuClick}
      openKeys={openKeys}
      onOpenChange={onMenuOpenChange}
      {...props}
    />
  );
});
