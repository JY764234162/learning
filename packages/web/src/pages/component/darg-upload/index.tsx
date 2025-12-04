import React, { useState, useCallback, useRef } from "react";
import {
  Typography,
  Card,
  Alert,
  Space,
  Button,
  Progress,
  List,
  message,
  Upload,
} from "antd";
import {
  InboxOutlined,
  FileOutlined,
  FolderOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

interface FileItem {
  name: string;
  size: number;
  type: string;
  path: string;
  status: "uploading" | "done" | "error";
  progress: number;
}

export const Component = () => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // 创建两个文件输入引用，分别用于文件和文件夹选择
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // 处理文件上传
  const handleUpload = async (file: File, path: string = "") => {
    const fileItem: FileItem = {
      name: file.name,
      size: file.size,
      type: file.type,
      path: path ? `${path}/${file.name}` : file.name,
      status: "uploading",
      progress: 0,
    };

    setFileList((prev) => [...prev, fileItem]);

    try {
      // 这里模拟上传过程，实际使用时替换为真实的上传逻辑
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", path);

      // 模拟上传进度
      const totalChunks = 10;
      for (let i = 0; i <= totalChunks; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setFileList((prev) =>
          prev.map((item) =>
            item.path === fileItem.path
              ? { ...item, progress: (i / totalChunks) * 100 }
              : item
          )
        );
      }

      // 上传完成
      setFileList((prev) =>
        prev.map((item) =>
          item.path === fileItem.path
            ? { ...item, status: "done", progress: 100 }
            : item
        )
      );
    } catch (error) {
      // 上传失败
      setFileList((prev) =>
        prev.map((item) =>
          item.path === fileItem.path
            ? { ...item, status: "error", progress: 0 }
            : item
        )
      );
      window.$message?.error(`文件 ${file.name} 上传失败`);
    }
  };

  // 处理文件选择
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await handleUpload(file);
    }

    // 清空 input 值，允许重复选择相同文件
    event.target.value = "";
  };

  // 处理文件夹选择
  const handleFolderSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    // 处理文件夹中的文件
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 从完整路径中提取相对路径
      const path = file.webkitRelativePath.split("/").slice(0, -1).join("/");
      await handleUpload(file, path);
    }

    // 清空 input 值
    event.target.value = "";
  };

  // 触发文件选择
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // 触发文件夹选择
  const triggerFolderSelect = () => {
    folderInputRef.current?.click();
  };

  // 递归处理文件夹
  const processDirectory = async (
    entry: FileSystemEntry,
    path: string = ""
  ) => {
    if (entry.isFile) {
      const file = await new Promise<File>((resolve) => {
        (entry as FileSystemFileEntry).file(resolve);
      });
      await handleUpload(file, path);
    } else if (entry.isDirectory) {
      const dirReader = (entry as FileSystemDirectoryEntry).createReader();
      const entries = await new Promise<FileSystemEntry[]>((resolve) => {
        dirReader.readEntries((entries) => resolve(entries));
      });

      for (const entry of entries) {
        const newPath = path ? `${path}/${entry.name}` : entry.name;
        await processDirectory(entry, newPath);
      }
    }
  };

  // 处理拖拽事件
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const entry = item.webkitGetAsEntry();
      if (entry) {
        await processDirectory(entry);
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // 渲染文件列表
  const renderFileList = () => {
    return (
      <List
        className={styles.fileList}
        dataSource={fileList}
        renderItem={(item) => (
          <List.Item>
            <div className={styles.fileItem}>
              <Space>
                {item.type.includes("directory") ? (
                  <FolderOutlined />
                ) : (
                  <FileOutlined />
                )}
                <Text>{item.path}</Text>
              </Space>
              <div className={styles.fileProgress}>
                <Progress
                  percent={item.progress}
                  status={item.status === "error" ? "exception" : undefined}
                  size="small"
                />
              </div>
            </div>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>文件上传演示</Title>

      <Alert
        type="info"
        message="支持多种上传方式"
        description="您可以通过拖拽上传、选择文件或选择文件夹的方式上传内容。支持递归上传文件夹中的所有文件。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card>
          <div
            className={`${styles.dropZone} ${
              isDragging ? styles.dragging : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <InboxOutlined className={styles.uploadIcon} />
            <Title level={4}>拖拽文件或文件夹到此处上传</Title>
            <Paragraph type="secondary">
              或者使用下方按钮选择文件/文件夹
            </Paragraph>

            {/* 隐藏的文件输入框 */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              style={{ display: "none" }}
            />
            <input
              type="file"
              ref={folderInputRef}
              onChange={handleFolderSelect}
              /* @ts-expect-error */
              webkitdirectory=""
              style={{ display: "none" }}
            />

            <Space className={styles.uploadButtons}>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={triggerFileSelect}
              >
                选择文件
              </Button>
              <Button icon={<FolderOutlined />} onClick={triggerFolderSelect}>
                选择文件夹
              </Button>
            </Space>
          </div>
        </Card>

        {fileList.length > 0 && (
          <Card title="上传列表">{renderFileList()}</Card>
        )}
      </Space>
    </div>
  );
};

