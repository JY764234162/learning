import React, { useRef, useState, useCallback, useMemo } from "react";
import {
  Typography,
  Card,
  Alert,
  Space,
  Upload,
  Form,
  Slider,
  Switch,
  Select,
  Button,
} from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import styles from "./styles.module.css";
import debounce from "lodash/debounce";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

interface PixelationConfig {
  pixelSize: number;
  keepAspectRatio: boolean;
  pixelShape: "square" | "circle" | "rounded";
  colorReduction: boolean;
  colorLevels: number;
}

export const Component = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [form] = Form.useForm<PixelationConfig>();
  const [lastImage, setLastImage] = useState<HTMLImageElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const defaultConfig = useMemo(
    () => ({
      pixelSize: 10,
      keepAspectRatio: true,
      pixelShape: "square" as const,
      colorReduction: false,
      colorLevels: 8,
    }),
    []
  );

  const applyPixelation = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    setIsProcessing(true);

    requestAnimationFrame(() => {
      const config = form.getFieldsValue();

      // 设置画布尺寸为图片尺寸
      canvas.width = img.width;
      canvas.height = img.height;

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 先绘制原图
      ctx.drawImage(img, 0, 0);

      // 开始像素化处理
      const pixelSize = config.pixelSize;

      // 获取图像数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 清除画布以准备绘制像素化图像
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 遍历图像，按像素块处理
      for (let y = 0; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
          // 获取当前块的平均颜色
          const avgColor = getAverageColor(
            imageData,
            x,
            y,
            pixelSize,
            canvas.width,
            canvas.height
          );

          // 如果启用颜色减少
          if (config.colorReduction) {
            const levels = config.colorLevels;
            avgColor.r =
              Math.round((avgColor.r / 255) * (levels - 1)) *
              (255 / (levels - 1));
            avgColor.g =
              Math.round((avgColor.g / 255) * (levels - 1)) *
              (255 / (levels - 1));
            avgColor.b =
              Math.round((avgColor.b / 255) * (levels - 1)) *
              (255 / (levels - 1));
          }

          // 绘制像素块
          ctx.fillStyle = `rgb(${avgColor.r}, ${avgColor.g}, ${avgColor.b})`;

          // 根据选择的像素形状绘制
          switch (config.pixelShape) {
            case "circle":
              ctx.beginPath();
              ctx.arc(
                x + pixelSize / 2,
                y + pixelSize / 2,
                pixelSize / 2,
                0,
                Math.PI * 2
              );
              ctx.fill();
              break;

            case "rounded":
              ctx.beginPath();
              ctx.roundRect(x, y, pixelSize, pixelSize, pixelSize / 4);
              ctx.fill();
              break;

            case "square":
            default:
              ctx.fillRect(x, y, pixelSize, pixelSize);
              break;
          }
        }
      }

      setIsProcessing(false);
    });
  }, []);

  // 获取指定区域的平均颜色
  const getAverageColor = (
    imageData: ImageData,
    startX: number,
    startY: number,
    size: number,
    width: number,
    height: number
  ) => {
    let r = 0,
      g = 0,
      b = 0,
      count = 0;

    // 确保不超过图像边界
    const endX = Math.min(startX + size, width);
    const endY = Math.min(startY + size, height);

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const index = (y * width + x) * 4;
        r += imageData.data[index];
        g += imageData.data[index + 1];
        b += imageData.data[index + 2];
        count++;
      }
    }

    // 计算平均值
    return {
      r: Math.round(r / count),
      g: Math.round(g / count),
      b: Math.round(b / count),
    };
  };

  const debouncedApplyPixelation = useMemo(
    () => debounce((img: HTMLImageElement) => applyPixelation(img), 100),
    [applyPixelation]
  );

  const handleImageUpload = useCallback(
    (file: File) => {
      const img = new Image();
      const canvas = canvasRef.current;

      if (!canvas) return false;

      img.onload = () => {
        setLastImage(img);
        applyPixelation(img);
      };

      img.src = URL.createObjectURL(file);
      return false;
    },
    [applyPixelation]
  );

  const handleFormChange = () => {
    if (lastImage) {
      debouncedApplyPixelation(lastImage);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 创建下载链接
    const link = document.createElement("a");
    link.download = "像素化图片.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Canvas 像素化效果演示</Title>

      <Alert
        type="info"
        message="什么是图像像素化？"
        description="图像像素化是一种将图像分解成大的色块的处理技术，可以创造复古的8位游戏风格或艺术效果。通过调整像素大小和形状，可以得到不同的视觉效果。"
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

        <Card title="像素化配置">
          <Form
            form={form}
            initialValues={defaultConfig}
            onValuesChange={handleFormChange}
            layout="vertical"
          >
            <Form.Item
              label="像素大小"
              name="pixelSize"
              tooltip="像素块的尺寸，值越大像素化效果越明显"
            >
              <Slider min={1} max={50} />
            </Form.Item>

            <Form.Item
              label="保持宽高比"
              name="keepAspectRatio"
              valuePropName="checked"
              tooltip="启用后将保持原图的宽高比"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="像素形状"
              name="pixelShape"
              tooltip="选择不同的像素块形状"
            >
              <Select>
                <Option value="square">方形</Option>
                <Option value="circle">圆形</Option>
                <Option value="rounded">圆角</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="启用颜色减少"
              name="colorReduction"
              valuePropName="checked"
              tooltip="减少颜色数量，增强复古效果"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="颜色等级"
              name="colorLevels"
              tooltip="颜色数量，值越小颜色越少"
            >
              <Slider
                min={2}
                max={32}
                disabled={!form.getFieldValue("colorReduction")}
              />
            </Form.Item>
          </Form>
        </Card>

        <Card
          title="预览效果"
          extra={
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              disabled={!lastImage}
            >
              下载图片
            </Button>
          }
        >
          <div
            className={`${styles.canvasWrapper} ${
              isProcessing ? styles.canvasLoading : ""
            }`}
          >
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
        </Card>

        <Card title="功能说明">
          <Paragraph>
            <Text strong>像素化特点：</Text>
          </Paragraph>
          <ul>
            <li>可调整像素大小，控制像素化程度</li>
            <li>支持不同的像素形状（方形、圆形、圆角）</li>
            <li>可启用颜色减少功能，创造复古效果</li>
            <li>支持保持原图宽高比</li>
            <li>支持下载处理后的图片</li>
          </ul>

          <Paragraph>
            <Text strong>实现原理：</Text>
          </Paragraph>
          <ul>
            <li>使用 Canvas API 处理图片</li>
            <li>按指定步长分割图像区域</li>
            <li>计算每个区域的平均颜色</li>
            <li>使用不同形状绘制像素块</li>
            <li>可选的颜色量化处理，减少颜色数量</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

