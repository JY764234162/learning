import { ThemeContext } from "@/context/ThemeContext";
import { router } from "@/router/routers";
import { routesSlice } from "@/store/slice/route";
import { transformToMenuItems, findFullPathByKey } from "@/store/slice/route/shared";
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

  const handleMenuClick = ({ key, keyPath }: { key: string; keyPath: string[] }) => {
    // 对于水平菜单的省略号菜单，keyPath 可能不完整
    // 需要从路由数据中查找完整路径
    const fullPath = findFullPathByKey(allRoutes, key);
    
    if (fullPath) {
      // 如果找到了完整路径，直接使用
      navigate(fullPath);
    } else {
      // 如果没找到，尝试使用 keyPath 构建路径
      // 过滤掉空字符串，并确保路径正确
      const validPath = keyPath.filter(Boolean).reverse();
      if (validPath.length > 0) {
        const path = "/" + validPath.join("/");
        navigate(path);
      } else {
        // 如果 keyPath 也为空，直接使用 key
        navigate(`/${key}`);
      }
    }
  };

  return (
    <Menu
      theme={isDarkMode ? "dark" : "light"}
      mode={mode}
      items={items}
      selectedKeys={router.state.matches[router.state.matches.length - 1].pathname.split("/")}
      onClick={handleMenuClick}
      {...props}
    />
  );
};
