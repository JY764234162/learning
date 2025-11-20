import Router from "./router";
import AppProvider from "./context/AppProvider";
import { ThemeContextProvider } from "./context/ThemeContext/provider";
import "@/styles/index.css";
import AntdProvider from "./context/AntdProvider";
import { Suspense } from "react";

export default function App() {
  return (
    <ThemeContextProvider>
      <AntdProvider>
        <AppProvider>
          <Router />
        </AppProvider>
      </AntdProvider>
    </ThemeContextProvider>
  );
}
