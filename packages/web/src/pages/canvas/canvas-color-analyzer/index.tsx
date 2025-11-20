import React, { useRef, useState } from "react";
import { Typography, Card, Alert, Space, Upload, Table, Tag, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

interface ColorInfo {
  color: string;
  count: number;
  percentage: number;
}

interface ImageInfo {
  width: number;
  height: number;
  aspectRatio: string;
  size: string;
}

export const Component = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [colorStats, setColorStats] = useState<ColorInfo[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleImageUpload = (file: File) => {
    const img = new Image();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return false;

    setAnalyzing(true);
    setColorStats([]);

    img.onload = () => {
      // 设置图片信息
      setImageInfo({
        width: img.width,
        height: img.height,
        aspectRatio: `${img.width}:${img.height}`,
        size: formatFileSize(file.size),
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // 获取图片数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 统计颜色
      const colorCount: Record<string, number> = {};
      let totalPixels = 0;

      // 每隔几个像素采样一次，提高性能
      const step = 4;
      for (let i = 0; i < data.length; i += 4 * step) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        const color = `rgba(${r},${g},${b},${a})`;

        colorCount[color] = (colorCount[color] || 0) + 1;
        totalPixels++;
      }

      // 转换为数组并排序
      const sortedColors = Object.entries(colorCount)
        .map(([color, count]) => ({
          color,
          count,
          percentage: (count / totalPixels) * 100,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // 只显示前10种颜色

      setColorStats(sortedColors);
      setAnalyzing(false);
    };

    img.src = URL.createObjectURL(file);
    return false;
  };

  const columns = [
    {
      title: "颜色预览",
      dataIndex: "color",
      key: "preview",
      render: (color: string) => <div className={styles.colorPreview} style={{ backgroundColor: color }} />,
    },
    {
      title: "颜色值",
      dataIndex: "color",
      key: "color",
      render: (color: string) => <Tag>{color}</Tag>,
    },
    {
      title: "出现频率",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage: number) => <Progress percent={Number(percentage.toFixed(2))} size="small" status="active" />,
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>图片颜色分析</Title>

      <Alert
        type="info"
        message="什么是图片颜色分析？"
        description="图片颜色分析是一种通过分析图片中每个像素点的颜色信息，统计出现频率最高的颜色的技术。这种技术可以用于提取图片的主色调、生成配色方案等场景。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="上传图片">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Upload.Dragger
              accept="image/*"
              beforeUpload={handleImageUpload}
              maxCount={1}
              fileList={imageFile ? [imageFile] : []}
              onChange={({ fileList }) => setImageFile(fileList[0])}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
            </Upload.Dragger>
          </Space>
        </Card>

        <Card title="预览">
          <div className={styles.canvasWrapper}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
        </Card>

        {imageInfo && (
          <Card title="图片信息">
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong>分辨率：</Text>
                <Text>{`${imageInfo.width} × ${imageInfo.height}`}</Text>
              </div>
              <div>
                <Text strong>宽高比：</Text>
                <Text>{imageInfo.aspectRatio}</Text>
              </div>
              <div>
                <Text strong>文件大小：</Text>
                <Text>{imageInfo.size}</Text>
              </div>
            </Space>
          </Card>
        )}

        <Card title="颜色统计" loading={analyzing}>
          <Table dataSource={colorStats} columns={columns} pagination={false} rowKey="color" />
        </Card>

        <Card title="功能说明">
          <Paragraph>
            <Text strong>实现原理：</Text>
          </Paragraph>
          <ul>
            <li>使用 Canvas API 获取图片像素数据</li>
            <li>遍历像素点统计颜色信息</li>
            <li>对颜色出现频率进行排序</li>
            <li>展示颜色分布情况</li>
          </ul>

          <Paragraph>
            <Text strong>应用场景：</Text>
          </Paragraph>
          <ul>
            <li>提取图片主色调</li>
            <li>生成配色方案</li>
            <li>图片颜色分析</li>
            <li>智能取色</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};
