import { ThemeContext } from "@/context/ThemeContext";
import { router } from "@/router/routers";
import { routesSlice } from "@/store/slice/route";
import { transformToMenuItems } from "@/store/slice/route/shared";
import { settingSlice } from "@/store/slice/setting";
import { Menu } from "antd";
import { MenuProps } from "antd/lib";
import { FC, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const GlobalMenu: FC<MenuProps> = (props) => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const settings = useSelector(settingSlice.selectors.getSettings);
  const isVertical = settings.layout.mode === "vertical";
  const mode = isVertical ? "inline" : "horizontal";
  const allRoutes = useSelector(routesSlice.selectors.getAllRoute);

  const items = useMemo(() => {
    return transformToMenuItems(allRoutes);
  }, [allRoutes]);

  return (
    <Menu
      theme={isDarkMode ? "dark" : "light"}
      mode={mode}
      items={items}
      selectedKeys={router.state.matches[router.state.matches.length - 1].pathname.split("/")}
      onClick={({ keyPath }) => {
        const path = "/" + keyPath.reverse().join("/");
        navigate(path);
      }}
      {...props}
    />
  );
};
