import React, { useState, useCallback } from "react";
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
import { InboxOutlined, FileOutlined, FolderOutlined } from "@ant-design/icons";
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

const FileUploadDemo: React.FC = () => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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
      message.error(`文件 ${file.name} 上传失败`);
    }
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
        message="支持拖拽上传文件和文件夹"
        description="您可以直接将文件或文件夹拖拽到下方区域进行上传。支持递归上传文件夹中的所有文件。"
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
              支持单个或多个文件，以及整个文件夹的上传
            </Paragraph>
          </div>
        </Card>

        {fileList.length > 0 && (
          <Card title="上传列表">{renderFileList()}</Card>
        )}
      </Space>
    </div>
  );
};

export default FileUploadDemo;
