import React from "react";
import BasicTooltip from "./components/BasicTooltip";
import ArrowCard from "./components/ArrowCard";
import DropdownMenu from "./components/DropdownMenu";
import TooltipList from "./components/TooltipList";
import ContextMenu from "./components/ContextMenu";
import AccessibleDropdown from "./components/AccessibleDropdown";
import AccessibleTooltip from "./components/AccessibleTooltip";

export const Component = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>
        Floating-UI 交互演示
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {/* 基础浮动提示 */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#555" }}>基础浮动提示</h3>
          <p style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
            鼠标悬停或点击按钮查看浮动提示
          </p>
          <BasicTooltip />
        </div>

        {/* 带箭头的浮动卡片 */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#555" }}>带箭头的浮动卡片</h3>
          <p style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
            展示带箭头的复杂浮动组件
          </p>
          <ArrowCard />
        </div>

        {/* 下拉菜单 */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#555" }}>下拉菜单</h3>
          <p style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
            模拟下拉菜单功能
          </p>
          <DropdownMenu />
        </div>

        {/* 工具提示 */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#555" }}>工具提示</h3>
          <p style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
            为不同元素添加工具提示
          </p>
          <TooltipList />
        </div>

        {/* 右键菜单 */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#555" }}>右键菜单</h3>
          <p style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
            右键点击区域查看自定义菜单
          </p>
          <ContextMenu />
        </div>

        {/* 无障碍下拉菜单示例 */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#555" }}>无障碍下拉菜单</h3>
          <p style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
            使用 useRole + useFocus 的无障碍下拉菜单
          </p>
          <AccessibleDropdown />
        </div>

        {/* 无障碍工具提示示例 */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#555" }}>无障碍工具提示</h3>
          <p style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
            使用 useRole + useFocus 的无障碍工具提示
          </p>
          <AccessibleTooltip />
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          textAlign: "center" as const,
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#555" }}>使用说明</h3>
        <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
          Floating-UI 是一个现代的浮动元素定位库，提供了强大的定位和交互功能。
          支持自动定位、边界检测、箭头、动画等功能。适用于工具提示、下拉菜单、弹出卡片等场景。
        </p>
      </div>
    </div>
  );
};





