import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Layout as AntdLayout, Menu, theme, Button } from "antd";
import { GlobalMenu } from "./global-menu";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import GlobalLogo from "./global-logo";

import { GlobalHeader } from "./global-header";
import { GlobalFooter } from "./global-footer";
import { layoutSlice } from "@/store/slice/layout";
import { useResponsive, configResponsive } from "ahooks";
import { GlobalSider } from "./global-sider";
//配置是否小屏
configResponsive({
  small: 768, //768px以下为小屏
});
const { Content, Footer } = AntdLayout;

export const VerticalLayout: React.FC = () => {
  const dispatch = useDispatch();
  const { small } = useResponsive();
  const isMobile = !small;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    dispatch(layoutSlice.actions.setIsMobile(isMobile));
  }, [isMobile]);

  return (
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
  );
};
