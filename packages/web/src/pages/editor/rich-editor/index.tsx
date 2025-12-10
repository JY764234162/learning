import React, { useRef, useEffect, useState } from "react";
import { Card, Button, Space } from "antd";
import { CodeOutlined, FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { RichEditor } from "./core/Editor";
import { Toolbar } from "./components/Toolbar";
import { SourceEditor } from "./components/SourceEditor";
import { SelectionToolbar } from "./components/SelectionToolbar";
import { defaultContent } from "./defaultContent";
import styles from "./index.module.less";

export interface RichEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  height?: number | string;
  readOnly?: boolean;
  showDefaultContent?: boolean; // 是否显示默认内容
}

export const Component: React.FC<RichEditorProps> = ({
  value,
  onChange,
  placeholder = "请输入内容...",
  height = 600,
  readOnly = false,
  showDefaultContent = true, // 默认显示示例内容
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<RichEditor | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const [sourceVisible, setSourceVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const selectionTimerRef = useRef<number | null>(null);
  const selectionMarkerRef = useRef<HTMLSpanElement | null>(null);
  const isSelectingRef = useRef<boolean>(false); // 标记是否正在选择
  const isFormattingRef = useRef<boolean>(false); // 标记是否正在执行格式化操作
  
  // 创建选择标记元素的函数
  const createSelectionMarker = (range: Range) => {
    // 移除旧的标记
    if (selectionMarkerRef.current && selectionMarkerRef.current.parentNode) {
      selectionMarkerRef.current.parentNode.removeChild(selectionMarkerRef.current);
    }

    try {
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        return;
      }

      // 创建一个不可见的标记元素
      const marker = document.createElement("span");
      marker.style.position = "absolute";
      marker.style.left = `${rect.left}px`;
      marker.style.top = `${rect.top}px`;
      marker.style.width = `${rect.width}px`;
      marker.style.height = `${rect.height}px`;
      marker.style.pointerEvents = "none";
      marker.style.visibility = "hidden";
      marker.setAttribute("data-selection-marker", "true");
      
      document.body.appendChild(marker);
      selectionMarkerRef.current = marker;
    } catch (error) {
      console.warn("Failed to create selection marker:", error);
    }
  };

  // 移除选择标记元素
  const removeSelectionMarker = () => {
    if (selectionMarkerRef.current && selectionMarkerRef.current.parentNode) {
      selectionMarkerRef.current.parentNode.removeChild(selectionMarkerRef.current);
      selectionMarkerRef.current = null;
    }
  };

  // 初始化编辑器
  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const editor = new RichEditor(editorRef.current, {
      placeholder,
      onContentChange: (html) => {
        onChange?.(html);
      },
      onSelectionChange: () => {
        // 选择变化时的处理
      },
    });

    editorInstanceRef.current = editor;
    setEditorReady(true);

    // 注册示例插件（字数统计）
    import("./plugins/WordCountPlugin").then(({ WordCountPlugin }) => {
      const wordCountPlugin = new WordCountPlugin();
      // 传递 wrapper 容器引用给插件（Card body）
      if (wrapperRef.current) {
        // 找到 Card body
        const cardBody = wrapperRef.current.querySelector(".ant-card-body");
        if (cardBody) {
          (wordCountPlugin as any).setContainer(cardBody as HTMLElement);
        } else {
          // 如果没有找到，使用 wrapper
          (wordCountPlugin as any).setContainer(wrapperRef.current);
        }
      }
      editor.getPluginManager().register(wordCountPlugin);
    });

    // 设置初始内容
    if (value !== undefined && value !== null) {
      editor.setHTML(value);
    } else if (showDefaultContent) {
      editor.setHTML(defaultContent);
    }

    return () => {
      editor.destroy();
      editorInstanceRef.current = null;
      setEditorReady(false);
      removeSelectionMarker();
    };
  }, []);

  // 同步外部 value 变化
  useEffect(() => {
    if (editorInstanceRef.current && value !== undefined && value !== null && value !== editorInstanceRef.current.getHTML()) {
      editorInstanceRef.current.setHTML(value);
    }
  }, [value]);

  // 处理只读模式
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.contentEditable = readOnly ? "false" : "true";
    }
  }, [readOnly]);

  // 源码编辑
  const handleSourceEdit = () => {
    setSourceVisible(true);
  };

  const handleSourceSave = (html: string) => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current.setHTML(html);
      onChange?.(html);
    }
    setSourceVisible(false);
  };

  // 全屏
  const handleFullscreen = () => {
    if (!isFullscreen) {
      editorRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // 监听文本选择变化
  useEffect(() => {
    if (!editorRef.current || readOnly) {
      return;
    }

    // 检查并显示工具栏的函数
    const checkAndShowToolbar = () => {
      const selection = window.getSelection();
      
      if (!selection || selection.rangeCount === 0) {
        setSelectionVisible(false);
        setSelectionRange(null);
        removeSelectionMarker();
        return;
      }

      const range = selection.getRangeAt(0);
      
      // 检查选择是否在编辑器内
      if (!editorRef.current?.contains(range.commonAncestorContainer)) {
        setSelectionVisible(false);
        setSelectionRange(null);
        removeSelectionMarker();
        return;
      }

      // 检查是否有选中的文本（不是空选择）
      const selectedText = selection.toString().trim();
      if (!selectedText || range.collapsed) {
        setSelectionVisible(false);
        setSelectionRange(null);
        removeSelectionMarker();
        return;
      }

      // 清除之前的定时器
      if (selectionTimerRef.current) {
        clearTimeout(selectionTimerRef.current);
      }

      // 延迟显示，确保选择稳定
      selectionTimerRef.current = window.setTimeout(() => {
        // 创建或更新标记元素用于定位
        createSelectionMarker(range);
        setSelectionRange(range.cloneRange());
        setSelectionVisible(true);
      }, 50) as unknown as number;
    };

    // 监听鼠标按下（开始选择）
    const handleMouseDown = (e: MouseEvent) => {
      // 检查是否在编辑器内按下
      if (editorRef.current?.contains(e.target as Node)) {
        isSelectingRef.current = true;
        // 如果点击在编辑器内，先隐藏工具栏
        setSelectionVisible(false);
        setSelectionRange(null);
        removeSelectionMarker();
      }
    };

    // 监听选择变化（仅用于清除，不显示工具栏）
    const handleSelectionChange = () => {
      // 如果正在选择中，不显示工具栏
      if (isSelectingRef.current) {
        return;
      }
      
      // 如果正在执行格式化操作，忽略选择变化（避免闪烁）
      if (isFormattingRef.current) {
        return;
      }
      
      // 如果选择被清空，隐藏工具栏
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        // 只有在工具栏可见时才隐藏（避免不必要的操作）
        if (selectionVisible) {
          setSelectionVisible(false);
          setSelectionRange(null);
          removeSelectionMarker();
        }
        return;
      }
      
      // 如果工具栏可见，检查选择是否还在编辑器内
      if (selectionVisible) {
        const range = selection.getRangeAt(0);
        if (!editorRef.current?.contains(range.commonAncestorContainer)) {
          setSelectionVisible(false);
          setSelectionRange(null);
          removeSelectionMarker();
        }
      }
    };
    
    // 监听鼠标抬起（用户完成选择）
    const handleMouseUp = () => {
      // 标记选择结束
      isSelectingRef.current = false;
      // 检查并显示工具栏
      checkAndShowToolbar();
    };

    // 监听键盘选择（Shift + 方向键）
    const handleKeyUp = (e: KeyboardEvent) => {
      // 如果按下了 Shift + 方向键，说明用户可能正在用键盘选择
      if (e.shiftKey && (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown")) {
        // 延迟检查，等待选择完成
        setTimeout(() => {
          isSelectingRef.current = false;
          checkAndShowToolbar();
        }, 100);
      } else if (!e.shiftKey) {
        // 如果释放了 Shift 键，说明选择可能结束
        isSelectingRef.current = false;
        setTimeout(() => {
          checkAndShowToolbar();
        }, 50);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keyup", handleKeyUp);
      if (selectionTimerRef.current) {
        clearTimeout(selectionTimerRef.current);
      }
      removeSelectionMarker();
    };
  }, [readOnly]);

  // 点击其他地方时隐藏选择工具栏
  useEffect(() => {
    if (!selectionVisible) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // 检查点击的是否是工具栏或其子元素
      const toolbar = document.querySelector('[data-selection-toolbar]');
      if (toolbar && (toolbar === target || toolbar.contains(target))) {
        return; // 点击的是工具栏，不关闭
      }

      // 检查点击的是否在下拉菜单或颜色选择器的弹框中
      // Ant Design 的下拉菜单和颜色选择器使用 Portal 渲染
      const dropdownMenu = target.closest('.ant-dropdown');
      const colorPickerPanel = target.closest('.ant-color-picker-panel') || target.closest('.ant-color-picker-dropdown');
      const modal = target.closest('.ant-modal');
      
      if (dropdownMenu || colorPickerPanel || modal) {
        return; // 点击的是二级弹框，不关闭工具栏
      }

      // 检查点击的是否在编辑器内
      if (editorRef.current && editorRef.current.contains(target)) {
        // 如果点击在编辑器内但不是选中文本，关闭工具栏
        if (selectionRange && !selectionRange.commonAncestorContainer.contains(target)) {
          setSelectionVisible(false);
          setSelectionRange(null);
          removeSelectionMarker();
        }
      } else {
        // 点击在编辑器外，关闭工具栏
        setSelectionVisible(false);
        setSelectionRange(null);
        removeSelectionMarker();
      }
    };

    // 使用捕获阶段，确保在其他事件之前处理
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [selectionVisible, selectionRange]);

  const editorHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div ref={wrapperRef} className={styles.richEditor} style={{ position: "relative" }}>
      <Card
        className={styles.card}
        bodyStyle={{ padding: 0, position: "relative" }}
        actions={[
          <Button
            key="source"
            icon={<CodeOutlined />}
            onClick={handleSourceEdit}
            title="源码编辑"
          >
            源码
          </Button>,
          <Button
            key="fullscreen"
            icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={handleFullscreen}
            title="全屏"
          >
            {isFullscreen ? "退出全屏" : "全屏"}
          </Button>,
        ]}
      >
        {!readOnly && editorReady && <Toolbar editor={editorInstanceRef.current} />}
        <div
          ref={editorRef}
          className={styles.editorContent}
          style={{ height: editorHeight }}
          contentEditable={!readOnly}
        />
      </Card>

      <SourceEditor
        visible={sourceVisible}
        html={editorInstanceRef.current?.getHTML() || ""}
        onSave={handleSourceSave}
        onCancel={() => setSourceVisible(false)}
      />

      {/* 划词工具栏 */}
      {!readOnly && editorReady && selectionRange && (
        <SelectionToolbar
          editor={editorInstanceRef.current}
          visible={selectionVisible}
          referenceElement={selectionMarkerRef.current}
          onClose={() => {
            setSelectionVisible(false);
            setSelectionRange(null);
            removeSelectionMarker();
          }}
          onFormattingStart={() => {
            isFormattingRef.current = true;
          }}
          onFormattingEnd={() => {
            // 延迟重置，确保格式化操作完成，避免 selectionchange 事件干扰
            setTimeout(() => {
              // 格式化完成后，检查选择是否还在，如果还在就更新选择标记
              const selection = window.getSelection();
              if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (editorRef.current?.contains(range.commonAncestorContainer)) {
                  const selectedText = selection.toString().trim();
                  if (selectedText && !range.collapsed) {
                    // 选择还在，更新标记和范围，保持工具栏显示
                    createSelectionMarker(range);
                    setSelectionRange(range.cloneRange());
                    setSelectionVisible(true);
                  }
                }
              }
              isFormattingRef.current = false;
            }, 200);
          }}
        />
      )}
    </div>
  );
};


