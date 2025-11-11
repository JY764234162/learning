import { ConfigProvider } from "antd";
import Router from "./router";
import zhCN from "antd/locale/zh_CN";
import { ThemeContextProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    </ThemeContextProvider>
  );
}
