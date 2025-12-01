import React, { useContext, useState } from "react";
import { Breadcrumb, Layout as AntdLayout, Menu, theme, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ThemeContext } from "@/context/ThemeContext";
import { GlobalMenu } from "./global-menu";
import { SwitchThemeButton } from "@/components/SwitchThemeButton";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { Outlet } from "react-router-dom";
import GlobalLogo from "./global-logo";
import { SettingButton } from "@/components/SettingDrawerButton";
import { FullScreenButton } from "@/components/FullScreenButton";
import { SearchButton } from "@/components/SearchButton";
import { GlobalHeader } from "./global-header";

const { Header, Sider, Content, Footer } = AntdLayout;

export const HorizontalLayout: React.FC = () => {
  const setting = useSelector(settingSlice.selectors.getSettings);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdLayout className="h-screen w-screen">
      <GlobalHeader />
      <Content style={{ overflow: "auto", minHeight: 280 }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>前端技术学习实验室 ©{new Date().getFullYear()} Created by JiangYi</Footer>
    </AntdLayout>
  );
};
