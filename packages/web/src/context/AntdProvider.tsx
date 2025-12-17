import { settingSlice } from "@/store/slice/setting";
import { App, ConfigProvider, theme, ThemeConfig } from "antd";
import { memo, useContext } from "react";
import { useSelector } from "react-redux";
import zhCN from "antd/locale/zh_CN";

const useTheme: () => ThemeConfig = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const color = settings.color;
  const isDarkMode = settings.themeMode === "dark";
  //颜色算法
  const algorithm = [isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm];
  //容器背景色
  const colorBgContainer = isDarkMode ? "rgb(28, 28, 28)" : "rgb(255, 255, 255)";
  return {
    algorithm,
    cssVar: true,
    components: {
      Layout: {
        bodyBg: colorBgContainer,
        headerBg: colorBgContainer,
        siderBg: colorBgContainer,
      },
      Menu: {
        itemBg: "transparent",
        darkItemBg: "transparent",
        subMenuItemBg: "transparent",
        darkSubMenuItemBg: "transparent",
      },
      Button: {
        primaryShadow: "unset",
      },
    },
    token: {
      colorPrimary: color.primary,
      colorError: color.error,
      colorSuccess: color.success,
      colorWarning: color.warning,
      colorInfo: color.info,
    },
  };
};
const AntdProvider = memo(({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <ConfigProvider theme={theme} locale={zhCN}>
      {children}
    </ConfigProvider>
  );
});

export default AntdProvider;

// tokens: {
//   dark: {
//     colors: {
//       "base-text": "rgb(224, 224, 224)",
//       container: "rgb(28, 28, 28)",
//       layout: "rgb(18, 18, 18)",
//     },
//   },
//   light: {
//     boxShadow: {
//       header: "0 1px 2px rgb(0, 21, 41, 0.08)",
//       sider: "2px 0 8px 0 rgb(29, 35, 41, 0.05)",
//       tab: "0 1px 2px rgb(0, 21, 41, 0.08)",
//     },
//     colors: {
//       "base-text": "rgb(31, 31, 31)",
//       container: "rgb(255, 255, 255)",
//       inverted: "rgb(0, 20, 40)",
//       layout: "rgb(247, 250, 252)",
//     },
//   },
// },
