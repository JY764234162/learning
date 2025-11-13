import React, { useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  useClick,
  useDismiss,
  FloatingPortal,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";

const ArrowCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    refs,
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(15), flip(), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
  ]);

  return (
    <div>
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
      >
        显示卡片
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
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 1000,
              maxWidth: "250px",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>浮动卡片</h4>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              这是一个更复杂的浮动卡片示例，可以包含更多内容和交互。
            </p>
          </div>
        )}
      </FloatingPortal>
    </div>
  );
};

export default ArrowCard;