import { ConfigProvider } from "antd";
import Router from "./router";
import "./App.css";
export default function App() {
  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  );
}
