import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import {
  Button,
  Card,
  Space,
  Typography,
  Input,
  Alert,
  Tabs,
  Table,
  Form,
} from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface TableItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

export const Component = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("text");
  const [content, setContent] = useState("在这里编辑内容...");
  const [markdown, setMarkdown] = useState("# 标题\n\n这是一段 Markdown 文本");
  const [tableData, setTableData] = useState<TableItem[]>([
    { key: "1", name: "张三", age: 32, address: "北京市" },
    { key: "2", name: "李四", age: 42, address: "上海市" },
  ]);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [form] = Form.useForm();

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }: any) => {
    const inputNode =
      inputType === "number" ? <Input type="number" /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `请输入${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: TableItem) => record.key === editingKey;

  const edit = (record: TableItem) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTableData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("验证失败:", errInfo);
    }
  };

  const tableColumns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      editable: true,
      onCell: (record: TableItem) => ({
        record,
        inputType: "text",
        dataIndex: "name",
        title: "姓名",
        editing: isEditing(record),
      }),
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      editable: true,
      onCell: (record: TableItem) => ({
        record,
        inputType: "number",
        dataIndex: "age",
        title: "年龄",
        editing: isEditing(record),
      }),
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      editable: true,
      onCell: (record: TableItem) => ({
        record,
        inputType: "text",
        dataIndex: "address",
        title: "地址",
        editing: isEditing(record),
      }),
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_: any, record: TableItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              保存
            </Button>
            <Button type="link" onClick={cancel}>
              取消
            </Button>
          </span>
        ) : (
          <Button
            type="link"
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            编辑
          </Button>
        );
      },
    },
  ];

  const handleCapture = async () => {
    if (!contentRef.current) return;
    try {
      const dataUrl = await htmlToImage.toJpeg(contentRef.current, {
        quality: 1,
        backgroundColor: "#fff",
        pixelRatio: window.devicePixelRatio || 1,
      });

      setPreviewUrl(dataUrl);
    } catch (error) {
      console.error("截图失败:", error);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = "screenshot.png";
    link.click();
  };

  const handleAddRow = () => {
    const newRow: TableItem = {
      key: `${tableData.length + 1}`,
      name: "",
      age: 0,
      address: "",
    };
    setTableData([...tableData, newRow]);
    edit(newRow);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "text":
        return (
          <div className={styles.captureWrapper}>
            <div className={styles.contentArea}>
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                autoSize={{ minRows: 4, maxRows: 8 }}
                style={{ marginBottom: "16px" }}
              />
            </div>
          </div>
        );
      case "markdown":
        return (
          <div className={styles.captureWrapper} data-color-mode="light">
            <div className={styles.contentArea}>
              <MDEditor
                value={markdown}
                onChange={(value) => setMarkdown(value || "")}
                height={300}
              />
            </div>
          </div>
        );
      case "table":
        return (
          <Form form={form} component={false}>
            <div className={styles.captureWrapper}>
              <div className={styles.contentArea}>
                <Button
                  type="dashed"
                  onClick={handleAddRow}
                  style={{ marginBottom: 16 }}
                  icon={<PlusOutlined />}
                >
                  添加行
                </Button>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  dataSource={tableData}
                  columns={tableColumns}
                  pagination={false}
                  bordered
                />
              </div>
            </div>
          </Form>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>HTML截图工具</Title>

      <Alert
        type="info"
        message="功能介绍"
        description="这是一个可以将 HTML 内容转换为图片的工具。支持纯文本、Markdown 和表格编辑，您可以自由编辑内容，然后生成图片并下载保存。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="编辑区域">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: "text",
                label: "纯文本",
              },
              {
                key: "markdown",
                label: "Markdown",
              },
              {
                key: "table",
                label: "表格",
              },
            ]}
          />
          <div ref={contentRef} className={styles.editorWrapper}>
            {renderContent()}
          </div>
        </Card>

        <Card
          title="操作按钮"
          extra={
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              disabled={!previewUrl}
            >
              下载图片
            </Button>
          }
        >
          <Button type="primary" onClick={handleCapture}>
            生成截图
          </Button>
        </Card>

        {previewUrl && (
          <Card title="预览效果">
            <img
              src={previewUrl}
              alt="预览图"
              className={styles.previewImage}
            />
          </Card>
        )}

        <Card title="使用说明">
          <Paragraph>
            <div>功能特点：</div>
          </Paragraph>
          <ul>
            <li>支持纯文本编辑</li>
            <li>支持 Markdown 编辑和预览</li>
            <li>支持表格编辑</li>
            <li>高清截图（2倍缩放）</li>
            <li>支持下载 PNG 格式图片</li>
            <li>支持跨域资源</li>
          </ul>

          <Paragraph>
            <div>使用步骤：</div>
          </Paragraph>
          <ol>
            <li>选择编辑模式（纯文本/Markdown/表格）</li>
            <li>编辑内容</li>
            <li>点击&quot;生成截图&quot;按钮</li>
            <li>在预览区域查看效果</li>
            <li>点击&quot;下载图片&quot;保存结果</li>
          </ol>
        </Card>
      </Space>
    </div>
  );
}
