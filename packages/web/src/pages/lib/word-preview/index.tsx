import React, { useState } from "react";
import { Upload, Card, Alert, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import mammoth from "mammoth";
import styles from "./index.module.less";

const { Dragger } = Upload;

export const Component = () => {
  const [previewContent, setPreviewContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError("");

    try {
      // 创建 ArrayBuffer 用于读取文件
      const arrayBuffer = await file.arrayBuffer();

      // 使用 mammoth 转换 word 文件为 html
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setPreviewContent(result.value);

      // 如果有警告信息
      if (result.messages.length > 0) {
        console.warn("Conversion warnings:", result.messages);
      }
    } catch (err) {
      setError("文件转换失败，请确保上传的是有效的 Word 文档");
      console.error("Conversion error:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".docx",
    beforeUpload: (file: File) => {
      handleFileUpload(file);
      return false; // 阻止自动上传
    },
    showUploadList: false,
  };

  return (
    <div className={styles.container}>
      <Card title="Word 文档预览" className={styles.card}>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽 Word 文件到此区域</p>
          <p className="ant-upload-hint">支持 .docx 格式的 Word 文档</p>
        </Dragger>

        {error && (
          <Alert
            message="错误"
            description={error}
            type="error"
            showIcon
            className={styles.alert}
          />
        )}

        <Spin spinning={loading}>
          {previewContent && (
            <div className={styles.previewContainer}>
              <div
                className={styles.preview}
                dangerouslySetInnerHTML={{ __html: previewContent }}
              />
            </div>
          )}
        </Spin>
      </Card>
    </div>
  );
}

