import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { SettingDrawer } from "@/components/SettingDrawerButton";
import { router } from "@/router/routers";
import { localStg } from "@/utils/storage";
import { MenuContextProvider } from "@/context/MenuContext/provider";
import { useMount, useUpdateEffect } from "ahooks";
import { Layout as AntdLayout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { GlobalHeader } from "./global-header";
import { GlobalFooter } from "./global-footer";
import { useResponsive, configResponsive } from "ahooks";
import { GlobalSider } from "./global-sider";
import { layoutSlice } from "@/store/slice/layout";
import { toggleAuxiliaryColorModes, toggleGrayscaleMode } from "@/store/slice/setting/shared";
import "./style.css";
//配置是否小屏
configResponsive({
  small: 768, //768px以下为小屏
});

const { Content } = AntdLayout;

export const Layout: React.FC = memo(() => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const dispatch = useDispatch();
  const { small } = useResponsive();
  const isMobile = !small;
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  //设置是否移动端
  useEffect(() => {
    dispatch(layoutSlice.actions.setIsMobile(isMobile));
    if (isMobile) {
      dispatch(settingSlice.actions.changeLayoutMode("vertical"));
    }
  }, [isMobile]);

  //初始化路由
  useMount(() => {
    router.navigate(router.state.matches[0].pathname);
  });

  useUpdateEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
    }
  }, [location]);

  //持久化设置
  useUpdateEffect(() => {
    localStg.set("settings", settings);
  }, [settings]);

  //初始化弱视和灰度
  useEffect(() => {
    toggleAuxiliaryColorModes(settings.colourWeakness);
    toggleGrayscaleMode(settings.grayscale);
  }, [settings.colourWeakness, settings.grayscale]);

  return (
    <MenuContextProvider>
      {settings.layout.mode === "vertical" ? (
        <AntdLayout className="h-screen w-screen">
          <GlobalSider isMobile={isMobile} />
          <AntdLayout>
            <GlobalHeader />
            <div className="flex flex-col h-full">
              <Content key={location.pathname} style={{ overflow: "auto" }} ref={scrollRef} className="scroll-bar">
                <Outlet />
              </Content>
              <GlobalFooter />
            </div>
          </AntdLayout>
        </AntdLayout>
      ) : (
        <AntdLayout className="h-screen w-screen">
          <GlobalHeader />
          <div className="flex flex-col h-full">
            <Content key={location.pathname} style={{ overflow: "auto" }} ref={scrollRef} className="scroll-bar">
              <Outlet />
            </Content>
            <GlobalFooter />
          </div>
        </AntdLayout>
      )}
      <SettingDrawer />
    </MenuContextProvider>
  );
});
