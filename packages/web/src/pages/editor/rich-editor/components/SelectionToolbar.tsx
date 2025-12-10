import React, { useState, useEffect } from "react";
import {
  Button,
  Space,
  Divider,
  Dropdown,
  ColorPicker,
  Input,
  Modal,
} from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  Placement,
} from "@floating-ui/react";
import { FloatingPortal } from "@floating-ui/react";
import type { RichEditor } from "../core/Editor";
import type { MenuProps } from "antd";

interface SelectionToolbarProps {
  editor: RichEditor | null;
  visible: boolean;
  referenceElement: HTMLElement | null;
  onClose: () => void;
  onFormattingStart?: () => void;
  onFormattingEnd?: () => void;
}

export const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
  editor,
  visible,
  referenceElement,
  onClose,
  onFormattingStart,
  onFormattingEnd,
}) => {
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isPositioned, setIsPositioned] = useState(false);

  // 使用 floating-ui 进行定位
  const { refs, floatingStyles } = useFloating({
    open: visible,
    placement: "top" as Placement,
    middleware: [
      offset(10),
      flip({
        fallbackPlacements: ["bottom", "top", "left", "right"],
      }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  // 设置参考元素
  useEffect(() => {
    if (referenceElement) {
      refs.setReference(referenceElement);
      // 重置定位状态，等待新位置计算
      setIsPositioned(false);
    } else {
      refs.setReference(null);
      setIsPositioned(false);
    }
  }, [referenceElement, refs]);

  // 检测位置是否已计算完成（不是默认的 0,0）
  useEffect(() => {
    if (visible && referenceElement && floatingStyles) {
      // 检查位置是否已经计算好
      // floating-ui 可能使用 transform 或 left/top
      const hasValidPosition = 
        (floatingStyles.transform && floatingStyles.transform !== 'translate(0px, 0px)') ||
        (floatingStyles.left !== undefined && typeof floatingStyles.left === 'number' && floatingStyles.left !== 0) ||
        (floatingStyles.top !== undefined && typeof floatingStyles.top === 'number' && floatingStyles.top !== 0);
      
      if (hasValidPosition) {
        // 延迟一点显示，确保位置稳定
        const timer = setTimeout(() => {
          setIsPositioned(true);
        }, 10);
        return () => clearTimeout(timer);
      } else {
        setIsPositioned(false);
      }
    } else {
      setIsPositioned(false);
    }
  }, [visible, referenceElement, floatingStyles]);

  // 字体大小选项
  const handleFontSize = (size: number) => {
    if (editor) {
      onFormattingStart?.();
      editor.fontSize(size);
      // 延迟结束格式化标志和关闭工具栏，确保格式化操作完成
      setTimeout(() => {
        onFormattingEnd?.();
        // 字体大小操作后关闭工具栏
        onClose();
      }, 150);
    }
  };

  const fontSizeItems: MenuProps["items"] = [1, 2, 3, 4, 5, 6, 7].map((size) => ({
    key: size.toString(),
    label: (
      <div 
        onClick={(e) => {
          e.stopPropagation();
          handleFontSize(size);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        style={{ cursor: "pointer", padding: "4px 0" }}
      >
        {size === 1 ? "普通" : `H${size - 1}`}
      </div>
    ),
  }));

  // 处理链接
  const handleInsertLink = () => {
    setLinkModalVisible(true);
  };

  const handleLinkOk = () => {
    if (linkUrl.trim() && editor) {
      onFormattingStart?.();
      editor.createLink(linkUrl.trim());
      setLinkUrl("");
      setLinkModalVisible(false);
      // 延迟结束格式化标志和关闭工具栏，确保链接创建完成
      setTimeout(() => {
        onFormattingEnd?.();
        // 链接创建后关闭工具栏
        onClose();
      }, 150);
    }
  };

  if (!visible || !editor) {
    return null;
  }

  return (
    <>
      <FloatingPortal>
        <div
          ref={refs.setFloating}
          data-selection-toolbar="true"
          style={{
            ...floatingStyles,
            zIndex: 1000,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            // 在位置计算完成前隐藏，避免闪烁
            opacity: isPositioned ? 1 : 0,
            transition: isPositioned ? "opacity 0.1s ease-in" : "none",
            pointerEvents: isPositioned ? "auto" : "none",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Space size={4} wrap>
            {/* 加粗 */}
            <Button
              icon={<BoldOutlined />}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onFormattingStart?.();
                editor.bold();
                // 格式化后不关闭工具栏，让用户继续操作
                // 只有在选择被清除时才会关闭
                setTimeout(() => {
                  onFormattingEnd?.();
                }, 50);
              }}
              type={editor.queryCommandState("bold") ? "primary" : "default"}
              size="small"
              title="加粗 (Ctrl+B)"
            />

            {/* 斜体 */}
            <Button
              icon={<ItalicOutlined />}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onFormattingStart?.();
                editor.italic();
                setTimeout(() => {
                  onFormattingEnd?.();
                }, 50);
              }}
              type={editor.queryCommandState("italic") ? "primary" : "default"}
              size="small"
              title="斜体 (Ctrl+I)"
            />

            {/* 下划线 */}
            <Button
              icon={<UnderlineOutlined />}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onFormattingStart?.();
                editor.underline();
                setTimeout(() => {
                  onFormattingEnd?.();
                }, 50);
              }}
              type={editor.queryCommandState("underline") ? "primary" : "default"}
              size="small"
              title="下划线 (Ctrl+U)"
            />

            {/* 删除线 */}
            <Button
              icon={<StrikethroughOutlined />}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onFormattingStart?.();
                editor.strikethrough();
                setTimeout(() => {
                  onFormattingEnd?.();
                }, 50);
              }}
              type={editor.queryCommandState("strikeThrough") ? "primary" : "default"}
              size="small"
              title="删除线"
            />

            <Divider type="vertical" style={{ margin: "0 4px" }} />

            {/* 字体大小 */}
            <Dropdown 
              menu={{ items: fontSizeItems }} 
              trigger={["click"]}
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
              onOpenChange={(open) => {
                // 不在这里关闭工具栏，让 handleFontSize 处理
              }}
            >
              <Button 
                icon={<FontSizeOutlined />} 
                size="small" 
                title="字体大小"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                字体
              </Button>
            </Dropdown>

            {/* 字体颜色 */}
            <ColorPicker
              size="small"
              onChange={(color) => {
                if (editor) {
                  onFormattingStart?.();
                  editor.fontColor(color.toHexString());
                  // 延迟结束格式化标志，确保格式化操作完成
                  setTimeout(() => {
                    onFormattingEnd?.();
                  }, 50);
                  // 不关闭工具栏，让用户继续操作
                }
              }}
              showText
              trigger="click"
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
              onOpenChange={(open) => {
                // 颜色选择器关闭时不关闭工具栏，让用户继续操作
                // 只有在选择被清除时才会关闭
              }}
            >
              <Button 
                icon={<BgColorsOutlined />} 
                size="small" 
                title="字体颜色"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              />
            </ColorPicker>

            {/* 背景色 */}
            <ColorPicker
              size="small"
              onChange={(color) => {
                if (editor) {
                  onFormattingStart?.();
                  editor.backgroundColor(color.toHexString());
                  // 延迟结束格式化标志，确保格式化操作完成
                  setTimeout(() => {
                    onFormattingEnd?.();
                  }, 50);
                  // 不关闭工具栏，让用户继续操作
                }
              }}
              showText
              trigger="click"
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
              onOpenChange={(open) => {
                // 颜色选择器关闭时不关闭工具栏，让用户继续操作
                // 只有在选择被清除时才会关闭
              }}
            >
              <Button 
                size="small" 
                title="背景色"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                背景
              </Button>
            </ColorPicker>

            <Divider type="vertical" style={{ margin: "0 4px" }} />

            {/* 链接 */}
            <Button
              icon={<LinkOutlined />}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleInsertLink();
              }}
              size="small"
              title="转换为链接"
            >
              链接
            </Button>
          </Space>
        </div>
      </FloatingPortal>

      {/* 链接输入弹窗 */}
      <Modal
        title="插入链接"
        open={linkModalVisible}
        onOk={handleLinkOk}
        onCancel={() => {
          setLinkModalVisible(false);
          setLinkUrl("");
        }}
        okText="确定"
        cancelText="取消"
      >
        <Input
          placeholder="请输入链接地址"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          onPressEnter={handleLinkOk}
          autoFocus
        />
      </Modal>
    </>
  );
};

