import React, { useState, useEffect } from "react";
import {
  Button,
  Space,
  Divider,
  Dropdown,
  ColorPicker,
  InputNumber,
  Modal,
  Input,
  Checkbox,
} from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  TableOutlined,
  UndoOutlined,
  RedoOutlined,
  CodeOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { RichEditor } from "../core/Editor";
import type { MenuProps } from "antd";

interface ToolbarProps {
  editor: RichEditor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [formatStates, setFormatStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [tableModalVisible, setTableModalVisible] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [findModalVisible, setFindModalVisible] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  // 更新格式状态
  const updateFormatStates = () => {
    if (!editor) return;

    setFormatStates({
      bold: editor.queryCommandState("bold"),
      italic: editor.queryCommandState("italic"),
      underline: editor.queryCommandState("underline"),
      strikethrough: editor.queryCommandState("strikeThrough"),
    });
  };

  useEffect(() => {
    if (!editor) return;
    
    // 监听选择变化
    const interval = setInterval(() => {
      updateFormatStates();
    }, 100);

    // 初始更新一次
    updateFormatStates();

    return () => clearInterval(interval);
  }, [editor]);

  // 文本格式
  const handleBold = () => {
    editor?.bold();
    updateFormatStates();
  };

  const handleItalic = () => {
    editor?.italic();
    updateFormatStates();
  };

  const handleUnderline = () => {
    editor?.underline();
    updateFormatStates();
  };

  const handleStrikethrough = () => {
    editor?.strikethrough();
    updateFormatStates();
  };

  // 字体大小
  const handleFontSize = (size: number) => {
    editor?.fontSize(size);
  };

  const fontSizeItems: MenuProps["items"] = [1, 2, 3, 4, 5, 6, 7].map((size) => ({
    key: size.toString(),
    label: (
      <div onClick={() => handleFontSize(size)}>
        {size === 1 ? "普通" : `H${size - 1}`}
      </div>
    ),
  }));

  // 对齐方式
  const handleAlign = (alignment: "left" | "center" | "right" | "justify") => {
    editor?.align(alignment);
  };

  // 列表
  const handleOrderedList = () => {
    editor?.insertOrderedList();
  };

  const handleUnorderedList = () => {
    editor?.insertUnorderedList();
  };

  // 链接
  const handleInsertLink = () => {
    setLinkModalVisible(true);
  };

  const handleLinkOk = () => {
    if (linkUrl.trim()) {
      editor?.createLink(linkUrl.trim());
      setLinkModalVisible(false);
      setLinkUrl("");
    }
  };

  // 图片
  const handleInsertImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          if (dataUrl) {
            editor?.insertImage(dataUrl, file.name);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // 表格
  const handleInsertTable = () => {
    setTableModalVisible(true);
  };

  const handleTableOk = () => {
    editor?.insertTable(tableRows, tableCols);
    setTableModalVisible(false);
  };

  // 撤销/重做
  const handleUndo = () => {
    editor?.undo();
  };

  const handleRedo = () => {
    editor?.redo();
  };

  // 字体颜色
  const handleFontColor = (color: string) => {
    editor?.fontColor(color);
  };

  // 背景色
  const handleBackgroundColor = (color: string) => {
    editor?.backgroundColor(color);
  };

  if (!editor) {
    return null;
  }

  return (
    <div style={{ padding: "8px", borderBottom: "1px solid #f0f0f0", background: "#fff" }}>
      <Space wrap>
        {/* 撤销/重做 */}
        <Button
          icon={<UndoOutlined />}
          onClick={handleUndo}
          disabled={!editor.canUndo()}
          title="撤销 (Ctrl+Z)"
        />
        <Button
          icon={<RedoOutlined />}
          onClick={handleRedo}
          disabled={!editor.canRedo()}
          title="重做 (Ctrl+Shift+Z)"
        />

        <Divider type="vertical" />

        {/* 文本格式 */}
        <Button
          icon={<BoldOutlined />}
          onClick={handleBold}
          type={formatStates.bold ? "primary" : "default"}
          title="加粗 (Ctrl+B)"
        />
        <Button
          icon={<ItalicOutlined />}
          onClick={handleItalic}
          type={formatStates.italic ? "primary" : "default"}
          title="斜体 (Ctrl+I)"
        />
        <Button
          icon={<UnderlineOutlined />}
          onClick={handleUnderline}
          type={formatStates.underline ? "primary" : "default"}
          title="下划线 (Ctrl+U)"
        />
        <Button
          icon={<StrikethroughOutlined />}
          onClick={handleStrikethrough}
          type={formatStates.strikethrough ? "primary" : "default"}
          title="删除线"
        />

        <Divider type="vertical" />

        {/* 字体大小 */}
        <Dropdown menu={{ items: fontSizeItems }} trigger={["click"]}>
          <Button icon={<FontSizeOutlined />} title="字体大小">
            字体
          </Button>
        </Dropdown>

        {/* 字体颜色 */}
        <ColorPicker
          size="small"
          onChange={(color) => handleFontColor(color.toHexString())}
          showText
        >
          <Button icon={<BgColorsOutlined />} title="字体颜色" />
        </ColorPicker>

        {/* 背景色 */}
        <ColorPicker
          size="small"
          onChange={(color) => handleBackgroundColor(color.toHexString())}
          showText
        >
          <Button title="背景色">背景</Button>
        </ColorPicker>

        <Divider type="vertical" />

        {/* 对齐方式 */}
        <Button
          icon={<AlignLeftOutlined />}
          onClick={() => handleAlign("left")}
          title="左对齐"
        />
        <Button
          icon={<AlignCenterOutlined />}
          onClick={() => handleAlign("center")}
          title="居中"
        />
        <Button
          icon={<AlignRightOutlined />}
          onClick={() => handleAlign("right")}
          title="右对齐"
        />
        <Button
          onClick={() => handleAlign("justify")}
          title="两端对齐"
        >
          对齐
        </Button>

        <Divider type="vertical" />

        {/* 列表 */}
        <Button
          icon={<UnorderedListOutlined />}
          onClick={handleUnorderedList}
          title="无序列表"
        />
        <Button
          icon={<OrderedListOutlined />}
          onClick={handleOrderedList}
          title="有序列表"
        />

        <Divider type="vertical" />

        {/* 插入 */}
        <Button
          icon={<LinkOutlined />}
          onClick={handleInsertLink}
          title="插入链接"
        />
        <Button
          icon={<PictureOutlined />}
          onClick={handleInsertImage}
          title="插入图片"
        />
        <Button
          icon={<TableOutlined />}
          onClick={handleInsertTable}
          title="插入表格"
        />

        <Divider type="vertical" />

        {/* 查找替换 */}
        <Button
          icon={<SearchOutlined />}
          onClick={() => setFindModalVisible(true)}
          title="查找替换 (Ctrl+F)"
        >
          查找
        </Button>
      </Space>

      {/* 链接对话框 */}
      <Modal
        title="插入链接"
        open={linkModalVisible}
        onOk={handleLinkOk}
        onCancel={() => {
          setLinkModalVisible(false);
          setLinkUrl("");
        }}
      >
        <Input
          placeholder="请输入链接地址"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          onPressEnter={handleLinkOk}
        />
      </Modal>

      {/* 表格对话框 */}
      <Modal
        title="插入表格"
        open={tableModalVisible}
        onOk={handleTableOk}
        onCancel={() => setTableModalVisible(false)}
      >
        <Space>
          <span>行数：</span>
          <InputNumber
            min={1}
            max={20}
            value={tableRows}
            onChange={(value) => setTableRows(value || 3)}
          />
          <span>列数：</span>
          <InputNumber
            min={1}
            max={20}
            value={tableCols}
            onChange={(value) => setTableCols(value || 3)}
          />
        </Space>
      </Modal>

      {/* 查找替换对话框 */}
      <Modal
        title="查找替换"
        open={findModalVisible}
        onCancel={() => {
          setFindModalVisible(false);
          editor?.clearHighlight();
        }}
        footer={null}
        width={500}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <div style={{ marginBottom: 8 }}>查找：</div>
            <Input
              placeholder="请输入要查找的文本"
              value={findText}
              onChange={(e) => {
                setFindText(e.target.value);
                if (e.target.value) {
                  editor?.findAndHighlight(e.target.value, caseSensitive);
                } else {
                  editor?.clearHighlight();
                }
              }}
              onPressEnter={() => {
                if (findText) {
                  editor?.findAndHighlight(findText, caseSensitive);
                }
              }}
            />
          </div>
          <div>
            <div style={{ marginBottom: 8 }}>替换为：</div>
            <Input
              placeholder="请输入替换文本"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
          </div>
          <div>
            <Checkbox
              checked={caseSensitive}
              onChange={(e) => {
                setCaseSensitive(e.target.checked);
                if (findText) {
                  editor?.clearHighlight();
                  editor?.findAndHighlight(findText, e.target.checked);
                }
              }}
            >
              区分大小写
            </Checkbox>
          </div>
          <Space>
            <Button
              onClick={() => {
                if (findText) {
                  editor?.findAndHighlight(findText, caseSensitive);
                }
              }}
            >
              查找
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (findText && replaceText) {
                  const count = editor?.replaceText(findText, replaceText, false) || 0;
                  window.$message?.success(`已替换 ${count} 处`);
                }
              }}
            >
              替换
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (findText && replaceText) {
                  const count = editor?.replaceText(findText, replaceText, true) || 0;
                  window.$message?.success(`已替换 ${count} 处`);
                  editor?.clearHighlight();
                }
              }}
            >
              全部替换
            </Button>
          </Space>
        </Space>
      </Modal>
    </div>
  );
};

