import React, { useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  useClick,
  useRole,
  useDismiss,
  FloatingPortal,
  offset,
  flip,
  shift,
  autoUpdate,
  Placement,
} from "@floating-ui/react";

interface BasicTooltipProps {
  placement?: Placement;
}

const BasicTooltip: React.FC<BasicTooltipProps> = ({ placement = "bottom" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlacement, setCurrentPlacement] = useState<Placement>(placement);

  const {
    refs,
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: currentPlacement,
    middleware: [offset(10), flip(), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useClick(context),
    useDismiss(context),
    useRole(context),
  ]);

  const placements: Placement[] = [
    "top", "bottom", "left", "right",
    "left-start", "left-end", "right-start", "right-end",
    "top-start", "top-end", "bottom-start", "bottom-end",
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
        {placements.map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPlacement(p)}
            style={{
              padding: "5px 10px",
              border: `1px solid ${currentPlacement === p ? "#1890ff" : "#d9d9d9"}`,
              borderRadius: "4px",
              backgroundColor: currentPlacement === p ? "#1890ff" : "white",
              color: currentPlacement === p ? "white" : "#333",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {p}
          </button>
        ))}
      </div>

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
      >
        悬停或点击我
      </button>

      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{
              ...floatingStyles,
              backgroundColor: "#333",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              zIndex: 1000,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            这是一个浮动提示！位置: {currentPlacement}
          </div>
        )}
      </FloatingPortal>
    </div>
  );
};

export default BasicTooltip;