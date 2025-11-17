import { settingSlice } from "@/store/slice/setting";
import { App, ConfigProvider, theme, ThemeConfig } from "antd";
import { memo, useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "./ThemeContext";
import zhCN from "antd/locale/zh_CN";

const useTheme: () => ThemeConfig = () => {
  const color = useSelector(settingSlice.selectors.getColors);
  const { isDarkMode } = useContext(ThemeContext);
  const algorithm = [isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm];

  return {
    algorithm,
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
