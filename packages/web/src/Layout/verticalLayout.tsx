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

const { Header, Sider, Content, Footer } = AntdLayout;

const siderWitch = 220;

export const VerticalLayout: React.FC = () => {
  const setting = useSelector(settingSlice.selectors.getSettings);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntdLayout className="h-screen w-screen">
      <Sider collapsed={collapsed} style={{ width: siderWitch }}>
        <div className="h-full flex flex-col justify-center items-center">
          <GlobalLogo showTitle={!collapsed} className="w-full" />
          <GlobalMenu inlineCollapsed={collapsed} style={{ overflow: "auto", flex: 1, width: "100%" }} />
        </div>
      </Sider>
      <AntdLayout>
        <Header style={{ padding: 0, background: colorBgContainer, display: "flex", gap: 16, alignItems: "center", paddingRight: 32 }}>
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
          <div style={{ flex: 1 }}></div>
          <SwitchThemeButton />
          <SettingButton />
        </Header>
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
