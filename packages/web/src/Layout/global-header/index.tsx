import { ThemeContext } from "@/context/ThemeContext";
import { settingSlice } from "@/store/slice/setting";
import { Button, Menu, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { FC, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalLogo from "../global-logo";
import { GlobalMenu } from "../global-menu";
import { SearchButton } from "@/components/SearchButton";
import { FullScreenButton } from "@/components/FullScreenButton";
import { SwitchThemeButton } from "@/components/SwitchThemeButton";
import { SettingButton } from "@/components/SettingDrawerButton";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

// console.log(Object.entries(modules));

export const GlobalHeader = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleCollapsed = () => {
    dispatch(settingSlice.actions.setCollapsed(!settings.collapsed));
  };

  const ButtonList = (
    <>
      <SearchButton />
      <FullScreenButton />
      <SwitchThemeButton />
      <SettingButton />
    </>
  );

  return settings.layout.mode === "vertical" ? (
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
      <Button type="text" icon={settings.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggleCollapsed} />
      <div style={{ flex: 1 }}></div>
      {ButtonList}
    </Header>
  ) : (
    <Header style={{ display: "flex", alignItems: "center", gap: 8, boxShadow: "0 1px 2px rgb(0, 21, 41, 0.08)" }}>
      <GlobalLogo />
      <GlobalMenu style={{ flex: 1, overflow: "hidden", border: "none" }} />
      {ButtonList}
    </Header>
  );
};
