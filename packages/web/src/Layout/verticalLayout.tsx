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

const siderWitch = 220;

export const VerticalLayout: React.FC = () => {
  const setting = useSelector(settingSlice.selectors.getSettings);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntdLayout className="h-screen w-screen">
      <Sider collapsed={collapsed} style={{ width: siderWitch, boxShadow: "2px 0 8px 0 rgb(29, 35, 41, 0.05)", zIndex: 100 }}>
        <div className="h-full flex flex-col justify-center items-center">
          <GlobalLogo showTitle={!collapsed} className="w-full" />
          <GlobalMenu inlineCollapsed={collapsed} style={{ overflow: "auto", flex: 1, width: "100%", border: "none" }} />
        </div>
      </Sider>
      <AntdLayout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            gap: 16,
            alignItems: "center",
            boxShadow: "0 1px 2px rgb(0, 21, 41, 0.08)",
            zIndex: 10,
          }}
        >
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
          <div style={{ flex: 1 }}></div>
          <FullScreenButton />
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
