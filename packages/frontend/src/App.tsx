import { ConfigProvider } from "antd";
import Router from "./router";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

export default function App() {
  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  );
}
