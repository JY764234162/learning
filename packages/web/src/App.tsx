import Router from "./router";
import AppProvider from "./context/AppProvider";
import { ThemeContextProvider } from "./context/ThemeContext/provider";
import "@/styles/index.css";
import AntdProvider from "./context/AntdProvider";

import { useSelector } from "react-redux";
import { settingSlice } from "./store/slice/setting";
import { Watermark, WatermarkProps } from "antd";

const watermarkProps: WatermarkProps = {
  zIndex:100
};

export default function App() {
  const settings = useSelector(settingSlice.selectors.getSettings);
  console.log(settings);
  return (
    <ThemeContextProvider>
      <AntdProvider>
        <AppProvider>
          <Watermark
            className="h-full"
            content={settings.watermark.visible ? settings.watermark?.text || "JY-Admin" : ""}
            {...watermarkProps}
          >
            <Router />
          </Watermark>
        </AppProvider>
      </AntdProvider>
    </ThemeContextProvider>
  );
}
