import Router from "./router";
import AppProvider from "./context/AppProvider";
import AntdProvider from "./context/AntdProvider";
import { useSelector } from "react-redux";
import { settingSlice } from "./store/slice/setting";
import { Watermark, WatermarkProps } from "antd";
import "@/styles/index.css";
import "@/styles/scrollbar.scss";

const watermarkProps: WatermarkProps = {
  font: {
    fontSize: 16,
  },
  height: 128,
  offset: [12, 60],
  rotate: -15,
  width: 240,
  zIndex: 9999,
};

export default function App() {
  const settings = useSelector(settingSlice.selectors.getSettings);
  console.log("settings", settings);
  return (
    <AntdProvider>
      <AppProvider>
        <Watermark className="h-full" content={settings.watermark.visible ? settings.watermark?.text : ""} {...watermarkProps}>
          <Router />
        </Watermark>
      </AppProvider>
    </AntdProvider>
  );
}
