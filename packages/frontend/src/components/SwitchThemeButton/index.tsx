import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonProps } from "antd/lib";
import React, { useState } from "react";
import "./index.css";

export function SwitchThemeButton() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark: ButtonProps["onClick"] = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    // 先更新状态，然后在transition中应用
    const newDarkMode = !darkMode;

    const transition = document.startViewTransition(() => {
      const htmlElementClassList = document.documentElement.classList;

      if (newDarkMode) {
        htmlElementClassList.add("dark");
      } else {
        htmlElementClassList.remove("dark");
      }
      setDarkMode(newDarkMode);
    });

    transition.ready.then(() => {
      // 创建圆形展开动画：从点击位置开始，向外扩散
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

      document.documentElement.animate(
        {
          clipPath: newDarkMode ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: "ease-in-out",
          fill: "both",
          pseudoElement: newDarkMode ? "::view-transition-old(root)" : "::view-transition-new(root)",
        }
      );
    });
  };

  return <Button onClick={toggleDark} icon={darkMode ? <SunOutlined /> : <MoonOutlined />}></Button>;
}
