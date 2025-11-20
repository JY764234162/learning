import React, { useState } from "react";
import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  FloatingPortal,
  offset,
  flip,
  shift,
  FloatingOverlay,
  autoUpdate,
} from "@floating-ui/react";

interface MenuItem {
  label: string;
  action: () => void;
}

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(5), flip(), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
  });

  // const click = useClick(context);
  // const dismiss = useDismiss(context);

  // const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  // console.log(context,floatingStyles, getReferenceProps(), getFloatingProps());
  const menuItems: MenuItem[] = [
    { label: "编辑", action: () => console.log("编辑") },
    { label: "删除", action: () => console.log("删除") },
    { label: "分享", action: () => console.log("分享") },
  ];

  return (
    <>
      <button
        ref={refs.setReference}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        // {...getReferenceProps()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#faad14",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        下拉菜单 ▼
      </button>

      {isOpen && (
        <FloatingPortal>
          <FloatingOverlay
            lockScroll
            onMouseDown={() => {
              setIsOpen(false);
            }}
          />
          <div
            ref={refs.setFloating}
            // {...getFloatingProps()}
            style={{
              ...floatingStyles,
              backgroundColor: "white",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 1000,
              minWidth: "120px",
            }}
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "14px",
                  borderBottom: index < menuItems.length - 1 ? "1px solid #f0f0f0" : "none",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default DropdownMenu;
