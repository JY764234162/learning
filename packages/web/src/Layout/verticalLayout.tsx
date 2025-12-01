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

const siderWitch = 220;

export const VerticalLayout: React.FC = () => {
  const setting = useSelector(settingSlice.selectors.getSettings);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdLayout className="h-screen w-screen">
      <Sider collapsed={setting.collapsed} style={{ width: siderWitch, boxShadow: "2px 0 8px 0 rgb(29, 35, 41, 0.05)", zIndex: 100 }}>
        <div className="h-full flex flex-col justify-center items-center">
          <GlobalLogo showTitle={!setting.collapsed} className="w-full" />
          <GlobalMenu inlineCollapsed={setting.collapsed} style={{ overflow: "auto", flex: 1, width: "100%", border: "none" }} />
        </div>
      </Sider>
      <AntdLayout>
        <GlobalHeader />
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};
