import { ConfigProvider } from "antd";
import Router from "./router";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { initializePerformanceMonitoring } from "./stores/performanceStore";

export default function App() {
  useEffect(() => {
    const cleanup = initializePerformanceMonitoring();
    return cleanup;
  }, []);

  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  );
}
