import React, { useContext, useState } from "react";
import { Breadcrumb, Layout as AntdLayout, Menu, theme, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ThemeContext } from "@/context/ThemeContext";
import { GlobalMenu } from "./global-menu";
import { SwitchThemeButton } from "@/components/SwitchThemeButton";
import { SettingDrawerButton } from "@/components/SettingDrawerButton";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { Outlet } from "react-router-dom";
import GlobalLogo from "./global-logo";

const { Header, Sider, Content, Footer } = AntdLayout;

export const HorizontalLayout: React.FC = () => {
  const setting = useSelector(settingSlice.selectors.getSettings);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdLayout className="h-screen w-screen">
      <Header style={{ display: "flex", alignItems: "center", gap: 8, background: colorBgContainer }}>
        <GlobalLogo />
        <GlobalMenu />
        <SwitchThemeButton />
        <SettingDrawerButton />
      </Header>
      <Content style={{ overflow: "auto", background: colorBgContainer, minHeight: 280 }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </AntdLayout>
  );
};
