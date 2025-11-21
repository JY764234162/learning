import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { HorizontalLayout } from "./horizontalLayout";
import { VerticalLayout } from "./verticalLayout";
import { SettingDrawer } from "@/components/SettingDrawerButton";
import { router } from "@/router/routers";
import { localStg } from "@/utils/storage";

export const Layout: React.FC = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);

  useEffect(() => {
    router.navigate(router.state.matches[0].pathname);
  }, []);

  useEffect(() => {
    localStg.set("settings", settings);
  }, [settings]);

  return (
    <>
      {settings.layout.mode === "vertical" ? <VerticalLayout /> : <HorizontalLayout />}
      <SettingDrawer />
    </>
  );
};
export const Component = Layout;
