import { ConfigProvider } from "antd";
import Router from "./router";
import "./App.scss";

export default function App() {
  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  );
}
