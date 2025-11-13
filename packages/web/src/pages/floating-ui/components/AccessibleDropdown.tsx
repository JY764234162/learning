import React, { useState } from "react";
import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  useFocus,
  useListNavigation,
  FloatingPortal,
  offset,
  flip,
  shift,
} from "@floating-ui/react";

const AccessibleDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(5), flip(), shift({ padding: 5 })],
  });

  // 使用useRole设置无障碍角色和属性
  const role = useRole(context, { role: "menu" });

  // 使用useFocus管理焦点行为
  const focus = useFocus(context);

  // 使用useListNavigation支持键盘导航
  const listNavigation = useListNavigation(context, {
    listRef: React.useRef([]),
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([click, dismiss, role, focus, listNavigation]);

  const menuItems = [
    { label: "文件", action: () => console.log("打开文件") },
    { label: "编辑", action: () => console.log("编辑内容") },
    { label: "视图", action: () => console.log("切换视图") },
    { label: "帮助", action: () => console.log("显示帮助") },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h3>无障碍下拉菜单示例</h3>
      <p>尝试使用Tab键导航，空格键或回车键打开菜单，上下箭头键选择项目</p>

      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1890ff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        菜单 ▼
      </button>

      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{
              ...floatingStyles,
              backgroundColor: "white",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 1000,
              minWidth: "120px",
              padding: "4px 0",
            }}
            role="menu"
            aria-orientation="vertical"
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                {...getItemProps({
                  onClick: () => {
                    item.action();
                    setIsOpen(false);
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      item.action();
                      setIsOpen(false);
                    }
                  },
                })}
                role="menuitem"
                tabIndex={activeIndex === index ? 0 : -1}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "14px",
                  backgroundColor: activeIndex === index ? "#f0f0f0" : "transparent",
                  outline: activeIndex === index ? "2px solid #1890ff" : "none",
                  outlineOffset: "-2px",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </FloatingPortal>

      {/* 辅助信息 */}
      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
        <h4>无障碍特性说明：</h4>
        <ul>
          <li>
            <strong>useRole</strong>：自动添加了 role=&#39;menu&#39; 和 aria-orientation=&#39;vertical&#39; 属性
          </li>
          <li>
            <strong>useFocus</strong>：确保菜单打开时焦点正确管理
          </li>
          <li>
            <strong>键盘支持</strong>：Tab键聚焦，空格/回车打开，上下箭头导航
          </li>
          <li>
            <strong>屏幕阅读器</strong>：会朗读&#39;菜单，4个项目&#39;等信息
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccessibleDropdown;
