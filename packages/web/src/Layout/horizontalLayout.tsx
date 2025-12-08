import React, { useContext, useState } from "react";
import { Breadcrumb, Layout as AntdLayout, Menu, theme, Button } from "antd";

import { Outlet } from "react-router-dom";
import { GlobalHeader } from "./global-header";
import { GlobalFooter } from "./global-footer";

const { Content } = AntdLayout;

export const HorizontalLayout: React.FC = () => {
  return (
    <AntdLayout className="h-screen w-screen">
      <GlobalHeader />
      <Content style={{ overflow: "auto" }} id="__SCROLL_EL_ID__">
        <Outlet />
      </Content>
      <GlobalFooter />
    </AntdLayout>
  );
};
