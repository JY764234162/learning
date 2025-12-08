import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { SettingDrawer } from "@/components/SettingDrawerButton";
import { router } from "@/router/routers";
import { localStg } from "@/utils/storage";
import "./scrollbar.scss";
import { MenuContextProvider } from "./context/MenuContext/provider";
import { useMount, useUpdateEffect } from "ahooks";
import { Layout as AntdLayout, theme } from "antd";

import { Outlet } from "react-router-dom";
import { GlobalHeader } from "./global-header";

import { GlobalFooter } from "./global-footer";
import { useResponsive, configResponsive } from "ahooks";
import { GlobalSider } from "./global-sider";
import { layoutSlice } from "@/store/slice/layout";

//配置是否小屏
configResponsive({
  small: 768, //768px以下为小屏
});
const { Content } = AntdLayout;

export const Layout: React.FC = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const dispatch = useDispatch();
  const { small } = useResponsive();
  const isMobile = !small;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useUpdateEffect(() => {
    dispatch(layoutSlice.actions.setIsMobile(isMobile));
  }, [isMobile]);

  useMount(() => {
    router.navigate(router.state.matches[0].pathname);
  });

  useUpdateEffect(() => {
    localStg.set("settings", settings);
  }, [settings]);

  return (
    <MenuContextProvider>
      {settings.layout.mode === "vertical" ? (
        <AntdLayout className="h-screen w-screen">
          <GlobalSider isMobile={isMobile} />
          <AntdLayout>
            <GlobalHeader />
            <Content
              style={{
                background: colorBgContainer,
                overflow: "auto",
              }}
              id="__SCROLL_EL_ID__"
            >
              <Outlet />
            </Content>
            <GlobalFooter />
          </AntdLayout>
        </AntdLayout>
      ) : (
        <AntdLayout className="h-screen w-screen">
          <GlobalHeader />
          <Content style={{ overflow: "auto" }} id="__SCROLL_EL_ID__">
            <Outlet />
          </Content>
          <GlobalFooter />
        </AntdLayout>
      )}
      <SettingDrawer />
    </MenuContextProvider>
  );
};
