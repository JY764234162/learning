import React from "react";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { HorizontalLayout } from "./horizontalLayout";
import { VerticalLayout } from "./verticalLayout";
import { SettingDrawer } from "@/components/SettingDrawerButton";

export const Layout: React.FC = () => {
  const setting = useSelector(settingSlice.selectors.getSettings);

  return (
    <>
      {setting.layout.mode === "vertical" ? <VerticalLayout /> : <HorizontalLayout />}
      <SettingDrawer />
    </>
  );
};
