import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Button, Spin, Space, Upload, Progress, Card, Alert } from "antd";
import { LeftOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined, UploadOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import styles from "./index.module.less";

const { Dragger } = Upload;

// 导入本地 worker 文件 - 使用 Vite 的 ?url 导入
// 使用 .js 文件（更通用）
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// 设置 worker - 使用本地 worker 文件
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parsing, setParsing] = useState(false); // 解析 PDF 时的 loading
  const [uploading, setUploading] = useState(false); // 上传状态
  const [uploadProgress, setUploadProgress] = useState(0); // 上传进度
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 加载 PDF 文件的通用函数
  const loadPdfFromSource = async (source: string | ArrayBuffer) => {
    try {
      setParsing(true);
      setError(null);
      setPageNum(1); // 重置到第一页

      const loadingTask = pdfjsLib.getDocument({
        data: source instanceof ArrayBuffer ? source : undefined,
        url: typeof source === "string" ? source : undefined,
        cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
        cMapPacked: true,
      });

      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setParsing(false);
      window.$message?.success("PDF 加载成功");
    } catch (err: any) {
      console.error("Error loading PDF:", err);
      setError(err.message || "加载 PDF 失败");
      setParsing(false);
      window.$message?.error("PDF 加载失败");
    }
  };

  // 渲染页面
  useEffect(() => {
    if (!pdfDoc) return;

    let isMounted = true;

    const renderPage = async () => {
      try {
        // 等待 DOM 更新，确保 containerRef 已经挂载
        await new Promise((resolve) => setTimeout(resolve, 0));

        // 检查组件是否已卸载
        if (!isMounted) return;

        const container = containerRef.current;
        // 确保 container 是有效的 DOM 节点
        if (!container || !(container instanceof Node) || !container.isConnected) {
          return;
        }

        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        // 再次检查组件是否已卸载
        if (!isMounted) return;

        // 移除旧的 canvas
        const oldCanvas = container.querySelector("canvas");
        if (oldCanvas && oldCanvas instanceof Node) {
          try {
            oldCanvas.remove();
          } catch (err) {
            console.warn("Failed to remove old canvas:", err);
          }
        }

        // 创建新的 canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.display = "block";
        canvas.style.margin = "0 auto";
        canvas.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

        // 确保 container 仍然有效后再添加 canvas
        if (!isMounted || !container.isConnected || !(container instanceof Node)) {
          return;
        }

        try {
          container.appendChild(canvas);
        } catch (err) {
          console.error("Failed to append canvas:", err);
          return;
        }

        // 渲染页面
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        if (isMounted) {
          console.error("Error rendering page:", err);
          setError("渲染页面失败");
        }
      }
    };

    renderPage();

    return () => {
      isMounted = false;
    };
  }, [pdfDoc, pageNum, scale]);

  // 上一页
  const goToPrevPage = () => {
    if (pageNum <= 1) return;
    setPageNum(pageNum - 1);
  };

  // 下一页
  const goToNextPage = () => {
    if (pageNum >= numPages) return;
    setPageNum(pageNum + 1);
  };

  // 放大
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  // 缩小
  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  // 处理文件上传（用于 Dragger）
  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // 模拟上传进度（实际项目中应该从真实的上传 API 获取）
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // 读取文件为 ArrayBuffer
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result instanceof ArrayBuffer) {
            resolve(e.target.result);
          } else {
            reject(new Error("文件读取失败"));
          }
        };
        reader.onerror = () => reject(new Error("文件读取错误"));
        reader.readAsArrayBuffer(file);
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      // 加载 PDF
      await loadPdfFromSource(arrayBuffer);

      setUploading(false);
      setFileList([{ uid: file.name, name: file.name, status: "done" }]);
      window.$message?.success("文件上传成功");
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploading(false);
      setUploadProgress(0);
      setError(err.message || "文件上传失败");
      window.$message?.error("文件上传失败");
    }
  };

  // 处理文件上传（用于 Upload 组件）
  const handleUpload: UploadProps["customRequest"] = async (options) => {
    const { file, onProgress, onSuccess, onError } = options;
    const fileObj = file as File;
    await handleFileUpload(fileObj);
    onSuccess?.(fileObj);
  };

  // 处理文件列表变化
  const handleChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    // 只保留最后一个文件
    newFileList = newFileList.slice(-1);

    // 读取文件状态
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  // 移除文件
  const handleRemove = () => {
    setFileList([]);
    setPdfDoc(null);
    setNumPages(0);
    setPageNum(1);
    setError(null);
  };

  // 拖拽上传配置
  const draggerProps = {
    name: "file",
    multiple: false,
    accept: ".pdf",
    beforeUpload: (file: File) => {
      handleFileUpload(file);
      return false; // 阻止自动上传
    },
    showUploadList: false,
    disabled: uploading || parsing,
  };

  return (
    <div className={styles.container}>
      <Card title="PDF 文档预览" className={styles.card}>
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽 PDF 文件到此区域</p>
          <p className="ant-upload-hint">支持 .pdf 格式的 PDF 文档</p>
        </Dragger>

        {/* 上传进度条 */}
        {uploading && uploadProgress > 0 && (
          <div style={{ marginTop: "16px" }}>
            <Progress
              percent={uploadProgress}
              status={uploadProgress === 100 ? "success" : "active"}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
            />
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <Alert
            message="错误"
            description={error}
            type="error"
            showIcon
            className={styles.alert}
            action={
              <Button
                size="small"
                onClick={() => {
                  setError(null);
                  setFileList([]);
                }}
              >
                清除错误
              </Button>
            }
          />
        )}

        {/* 解析中的 loading */}
        {parsing && (
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Spin size="large" />
            <div style={{ marginTop: "16px", color: "#666" }}>解析 PDF 中...</div>
          </div>
        )}

        {/* PDF 预览区域 */}
        {pdfDoc && (
          <div style={{ marginTop: "24px" }}>
            {/* 工具栏 */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                padding: "12px",
                background: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <Space>
                <Button icon={<LeftOutlined />} onClick={goToPrevPage} disabled={pageNum <= 1}>
                  上一页
                </Button>
                <span style={{ minWidth: "120px", textAlign: "center" }}>
                  第 {pageNum} 页 / 共 {numPages} 页
                </span>
                <Button icon={<RightOutlined />} onClick={goToNextPage} disabled={pageNum >= numPages}>
                  下一页
                </Button>
              </Space>

              <Space>
                <Button icon={<ZoomOutOutlined />} onClick={zoomOut} disabled={scale <= 0.5}>
                  缩小
                </Button>
                <span style={{ minWidth: "80px", textAlign: "center" }}>{Math.round(scale * 100)}%</span>
                <Button icon={<ZoomInOutlined />} onClick={zoomIn} disabled={scale >= 3}>
                  放大
                </Button>
              </Space>
            </div>

            {/* PDF 内容区域 */}
            <div
              ref={containerRef}
              className={styles.previewContainer}
              style={{
                minHeight: "600px",
                overflow: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "20px",
                background: "#e8e8e8",
                position: "relative",
                border: "1px solid #f0f0f0",
                borderRadius: "2px",
              }}
            >
              {/* 解析中的 loading 遮罩 */}
              {parsing && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.8)",
                    zIndex: 10,
                  }}
                >
                  <Spin size="large" />
                  <div style={{ marginTop: "16px", color: "#666" }}>解析 PDF 中...</div>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
