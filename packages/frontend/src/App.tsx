import { ConfigProvider } from "antd";
import Router from "./router";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  );
}
