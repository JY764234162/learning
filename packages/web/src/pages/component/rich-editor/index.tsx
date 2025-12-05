import React, { useRef, useEffect, useState } from "react";
import { Card, Button, Space } from "antd";
import { CodeOutlined, FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { RichEditor } from "./core/Editor";
import { Toolbar } from "./components/Toolbar";
import { SourceEditor } from "./components/SourceEditor";
import styles from "./index.module.less";

export interface RichEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  height?: number | string;
  readOnly?: boolean;
}

export const Component: React.FC<RichEditorProps> = ({
  value = "",
  onChange,
  placeholder = "请输入内容...",
  height = 400,
  readOnly = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<RichEditor | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const [sourceVisible, setSourceVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    if (value) {
      editor.setHTML(value);
    }

    return () => {
      editor.destroy();
      editorInstanceRef.current = null;
      setEditorReady(false);
    };
  }, []);

  // 同步外部 value 变化
  useEffect(() => {
    if (editorInstanceRef.current && value !== editorInstanceRef.current.getHTML()) {
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
    </div>
  );
};

