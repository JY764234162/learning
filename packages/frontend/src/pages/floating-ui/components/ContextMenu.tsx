import React, { useState } from "react";
import { useFloating, useInteractions, useDismiss, FloatingPortal, FloatingOverlay, flip, shift, autoUpdate } from "@floating-ui/react";

interface MenuItem {
  label?: string;
  action?: string;
  icon?: string;
  type?: "divider";
}

const ContextMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start",
    middleware: [flip(), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // setPosition({ x: e.pageX, y: e.pageY });
    setIsOpen(true);
  };

  const handleMenuAction = (action: string) => {
    console.log(`执行操作: ${action}`);
    setIsOpen(false);
  };

  const menuItems: MenuItem[] = [
    { label: "复制", action: "copy", icon: "📋" },
    { label: "粘贴", action: "paste", icon: "📄" },
    { label: "删除", action: "delete", icon: "🗑️" },
    { type: "divider" },
    { label: "重命名", action: "rename", icon: "✏️" },
    { label: "属性", action: "properties", icon: "ℹ️" },
  ];

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        style={{
          padding: "40px",
          backgroundColor: "#f5f5f5",
          border: "2px dashed #d9d9d9",
          borderRadius: "8px",
          textAlign: "center",
          cursor: "context-menu",
          userSelect: "none",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#e6f7ff";
          e.currentTarget.style.borderColor = "#1890ff";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#f5f5f5";
          e.currentTarget.style.borderColor = "#d9d9d9";
        }}
      >
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>🖱️</div>
        <div style={{ color: "#666", fontSize: "14px" }}>右键点击此区域</div>
      </div>

      {isOpen && (
        <FloatingPortal {...getFloatingProps()}>
          <FloatingOverlay lockScroll />
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              // left: position.x,
              // top: position.y,
              backgroundColor: "white",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 1000,
              minWidth: "120px",
              padding: "4px 0",
            }}
          >
            {menuItems.map((item, index) => {
              if (item.type === "divider") {
                return (
                  <div
                    key={index}
                    style={{
                      height: "1px",
                      backgroundColor: "#f0f0f0",
                      margin: "4px 0",
                    }}
                  />
                );
              }

              return (
                <div
                  key={index}
                  onClick={() => item.action && handleMenuAction(item.action)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default ContextMenu;
