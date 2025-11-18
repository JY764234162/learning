import { ThemeContext } from "@/context/ThemeContext";
import { settingSlice } from "@/store/slice/setting";
import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { FC, useContext } from "react";
import { useSelector } from "react-redux";
import GlobalLogo from "../global-logo";

// console.log(Object.entries(modules));

export const GlobalMenu = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const settings = useSelector(settingSlice.selectors.getSettings);

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <GlobalLogo />
      <GlobalMenu />
    </Header>
  );
};
