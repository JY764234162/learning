import { ConfigProvider } from "antd";
import Router from "./router";
import zhCN from "antd/locale/zh_CN";
import { ThemeContextProvider } from "./context/ThemeContext";
import AppProvider from "./context/AppProvider";
import "@/styles/index.css";

export default function App() {
  return (
    <ThemeContextProvider>
      <ConfigProvider locale={zhCN}>
        <AppProvider>
          <Router />
        </AppProvider>
      </ConfigProvider>
    </ThemeContextProvider>
  );
}
