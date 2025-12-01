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

const { Header, Sider, Content, Footer } = AntdLayout;

export const HorizontalLayout: React.FC = () => {
  const setting = useSelector(settingSlice.selectors.getSettings);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdLayout className="h-screen w-screen">
      <Header style={{ display: "flex", alignItems: "center", gap: 8, boxShadow: "0 1px 2px rgb(0, 21, 41, 0.08)" }}>
        <GlobalLogo />
        <GlobalMenu style={{ flex: 1, overflow: "hidden", border: "none" }} />
        <FullScreenButton />
        <SwitchThemeButton />
        <SettingButton />
      </Header>
      <Content style={{ overflow: "auto", minHeight: 280 }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </AntdLayout>
  );
};
