import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { HorizontalLayout } from "./horizontalLayout";
import { VerticalLayout } from "./verticalLayout";
import { SettingDrawer } from "@/components/SettingDrawerButton";
import { router } from "@/router/routers";
import { localStg } from "@/utils/storage";
import "./scrollbar.scss";
import { MenuContextProvider } from "./context/MenuContext/provider";
import { useMount, useUpdateEffect } from "ahooks";

export const Layout: React.FC = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);

  useMount(() => {
    router.navigate(router.state.matches[0].pathname);
  });

  useUpdateEffect(() => {
    localStg.set("settings", settings);
  }, [settings]);

  return (
    <MenuContextProvider>
      {settings.layout.mode === "vertical" ? <VerticalLayout /> : <HorizontalLayout />}
      <SettingDrawer />
    </MenuContextProvider>
  );
};
