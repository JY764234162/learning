import React, { useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  FloatingPortal,
  offset,
  flip,
  shift,
} from "@floating-ui/react";

interface TooltipItem {
  text: string;
  label: string;
}

const TooltipList: React.FC = () => {
  const [tooltipStates, setTooltipStates] = useState<Record<string, boolean>>({});

  const createTooltip = (text: string, id: string) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
      refs,
      floatingStyles,
      context,
    } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: "top",
      middleware: [offset(8), flip(), shift({ padding: 5 })],
    });

    const hover = useHover(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    return {
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      isOpen,
    };
  };

  const tooltips: TooltipItem[] = [
    { text: "这是第一个工具提示", label: "悬停查看提示1" },
    { text: "这是第二个工具提示", label: "悬停查看提示2" },
  ];

  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      {tooltips.map((tooltip, index) => {
        const tooltipData = createTooltip(tooltip.text, `tooltip-${index}`);
        
        return (
          <div key={index}>
            <span
              ref={tooltipData.refs.setReference}
              {...tooltipData.getReferenceProps()}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {tooltip.label}
            </span>

            <FloatingPortal>
              {tooltipData.isOpen && (
                <div
                  ref={tooltipData.refs.setFloating}
                  {...tooltipData.getFloatingProps()}
                  style={{
                    ...tooltipData.floatingStyles,
                    backgroundColor: "#333",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    zIndex: 1000,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {tooltip.text}
                </div>
              )}
            </FloatingPortal>
          </div>
        );
      })}
    </div>
  );
};

export default TooltipList;