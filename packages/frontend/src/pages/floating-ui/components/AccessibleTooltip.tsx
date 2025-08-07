import React, { useState } from "react";
import { useFloating, useInteractions, useHover, useFocus, useRole, FloatingPortal, offset, flip, shift } from "@floating-ui/react";

const AccessibleTooltip: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(5), flip(), shift({ padding: 5 })],
  });

  // 使用useRole设置tooltip角色和属性
  const role = useRole(context, { role: "tooltip" });

  // 使用useFocus支持键盘焦点触发
  const focus = useFocus(context);
  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, role]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>无障碍工具提示示例</h3>
      <p>将鼠标悬停或键盘Tab聚焦到按钮上查看提示</p>

      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#52c41a",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
        aria-describedby="tooltip-content"
      >
        悬停或聚焦我
      </button>

      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            id="tooltip-content"
            style={{
              ...floatingStyles,
              backgroundColor: "#1f1f1f",
              color: "white",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              zIndex: 1000,
              maxWidth: "200px",
            }}
            role="tooltip"
          >
            这是一个无障碍工具提示！屏幕阅读器会朗读这个内容。
          </div>
        )}
      </FloatingPortal>

      {/* 对比示例 - 没有useRole的版本 */}
      <div style={{ marginTop: "40px" }}>
        <h4>对比：普通工具提示 vs 无障碍工具提示</h4>

        <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "20px" }}>
          {/* 普通版本 */}
          <div>
            <p>普通版本（无useRole）：</p>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              title="这是title属性提示"
            >
              普通按钮
            </button>
            <small style={{ display: "block", marginTop: "5px", color: "#666" }}>仅依赖title属性</small>
          </div>

          {/* 无障碍版本 */}
          <div>
            <p>无障碍版本（使用useRole）：</p>
            <button
              ref={refs.setReference}
              {...getReferenceProps()}
              style={{
                padding: "8px 16px",
                backgroundColor: "#1890ff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              aria-describedby="tooltip-content"
            >
              无障碍按钮
            </button>
            <small style={{ display: "block", marginTop: "5px", color: "#666" }}>使用aria-describedby和role=&#39;tooltip&#39;</small>
          </div>
        </div>
      </div>

      {/* 详细说明 */}
      <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px", textAlign: "left" }}>
        <h4>useRole和useFocus的作用：</h4>
        <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
          <li>
            <strong>useRole hook</strong>：
            <ul>
              <li>自动添加 role=tooltip 属性</li>
              <li>设置适当的ARIA属性（如aria-describedby）</li>
              <li>确保屏幕阅读器正确识别提示类型</li>
            </ul>
          </li>
          <li>
            <strong>useFocus hook</strong>：
            <ul>
              <li>支持键盘Tab键触发提示</li>
              <li>管理焦点状态变化</li>
              <li>确保键盘用户也能访问提示内容</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccessibleTooltip;
