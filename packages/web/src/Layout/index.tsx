import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { HorizontalLayout } from "./horizontalLayout";
import { VerticalLayout } from "./verticalLayout";
import { SettingDrawer } from "@/components/SettingDrawerButton";
import { router } from "@/router/routers";

export const Layout: React.FC = () => {
  const setting = useSelector(settingSlice.selectors.getSettings);

  useEffect(() => {
    router.navigate(router.state.matches[0].pathname);
  }, []);

  return (
    <>
      {setting.layout.mode === "vertical" ? <VerticalLayout /> : <HorizontalLayout />}
      <SettingDrawer />
    </>
  );
};
export const Component = Layout;
