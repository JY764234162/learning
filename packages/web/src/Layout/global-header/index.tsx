import { settingSlice } from "@/store/slice/setting";
import { Button, Menu, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { FC, memo, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalLogo from "../global-logo";
import { GlobalMenu } from "../global-menu";
import { SearchButton } from "@/components/SearchButton";
import { FullScreenButton } from "@/components/FullScreenButton";
import { SwitchThemeButton } from "@/components/SwitchThemeButton";
import { SettingButton } from "@/components/SettingDrawerButton";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { layoutSlice } from "@/store/slice/layout";
import { GlobalBreadcrumb } from "../global-breadcrumb";
// console.log(Object.entries(modules));

export const GlobalHeader = memo(() => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const layoutSetting = useSelector(layoutSlice.selectors.getLayoutSetting);
  const dispatch = useDispatch();

  const toggleCollapsed = () => {
    dispatch(layoutSlice.actions.setIsCollapsed(!layoutSetting.isCollapsed));
  };

  const ButtonListRender = useMemo(() => {
    return (
      <>
        <SearchButton />
        <FullScreenButton />
        <SwitchThemeButton />
        <SettingButton />
      </>
    );
  }, []);

  return settings.layout.mode === "vertical" ? (
    <Header
      style={{
        padding: "0 16px",
        display: "flex",
        gap: 16,
        alignItems: "center",
        boxShadow: "0 1px 2px rgb(0, 21, 41, 0.08)",
        zIndex: 10,
      }}
    >
      <Button type="text" icon={layoutSetting.isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggleCollapsed} />
      <div style={{ flex: 1 }}>
       {layoutSetting.isMobile ? null : <GlobalBreadcrumb />}
      </div>
      {ButtonListRender}
    </Header>
  ) : (
    <Header style={{ display: "flex", alignItems: "center", gap: 8, boxShadow: "0 1px 2px rgb(0, 21, 41, 0.08)", padding: "0 16px" }}>
      <GlobalLogo />
      <GlobalMenu style={{ flex: 1, overflow: "hidden", border: "none" }} />
      {ButtonListRender}
    </Header>
  );
});
