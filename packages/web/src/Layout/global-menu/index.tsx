import { ThemeContext } from "@/context/ThemeContext";
import { settingSlice } from "@/store/slice/setting";
import { Menu } from "antd";
import { MenuProps } from "antd/lib";
import { FC, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const modules = import.meta.glob("../../pages/*/index.tsx");

// 提取路由名称
const items = Object.keys(modules)
  .map((path) => {
    const pathList = path.split("/");
    const value = pathList[pathList.length - 2];
    return { key: value, label: value };
  })
  .filter((item) => item.key !== "home"); // 排除当前home路由

export const GlobalMenu: FC<MenuProps> = (props) => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const settings = useSelector(settingSlice.selectors.getSettings);
  const isVertical = settings.layout.mode === "vertical";
  return (
    <Menu
      theme={isDarkMode ? "dark" : "light"}
      mode={settings.layout.mode}
      items={items}
      style={{ flex: 1, overflow: "hidden", border: "none" }}
      onClick={({ key }) => {
        navigate(key);
      }}
      {...props}
    />
  );
};
