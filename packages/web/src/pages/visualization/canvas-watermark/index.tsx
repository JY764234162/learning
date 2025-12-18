import React, { useRef, useState, useCallback, useMemo } from "react";
import {
  Typography,
  Card,
  Alert,
  Space,
  Upload,
  Form,
  Input,
  Slider,
  ColorPicker,
  Switch,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { Color } from "antd/es/color-picker";
import styles from "./styles.module.css";
import debounce from "lodash/debounce";

const { Title, Paragraph, Text } = Typography;

interface WatermarkConfig {
  text: string;
  fontSize: number;
  opacity: number;
  angle: number;
  spacing: number;
  useCustomColor: boolean;
  customColor: Color;
  useCurrentTime: boolean;
}

export const Component = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [form] = Form.useForm<WatermarkConfig>();
  const [lastImage, setLastImage] = useState<HTMLImageElement | null>(null);
  const dominantColorRef = useRef<string>("");

  const defaultConfig = useMemo(
    () => ({
      text: "水印文本",
      fontSize: 30,
      opacity: 0.3,
      angle: -30,
      spacing: 50,
      useCustomColor: false,
      customColor: "#000000",
      useCurrentTime: true,
    }),
    []
  );

  const getDominantColor = useCallback((img: HTMLImageElement): string => {
    if (dominantColorRef.current) return dominantColorRef.current;

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return "0,0,0";

    const scale = Math.min(1, 100 / Math.max(img.width, img.height));
    tempCanvas.width = img.width * scale;
    tempCanvas.height = img.height * scale;
    tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

    const imageData = tempCtx.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    const data = imageData.data;
    const colorCount: Record<string, number> = {};
    let dominantColor = "";

    const step = 4;
    for (let i = 0; i < data.length; i += 4 * step) {
      const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`;
      colorCount[rgb] = (colorCount[rgb] || 0) + 1;
      if (!dominantColor || colorCount[rgb] > colorCount[dominantColor]) {
        dominantColor = rgb;
      }
    }

    dominantColorRef.current = dominantColor;
    return dominantColor;
  }, []);

  const applyWatermark = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);

      const config = form.getFieldsValue();

      const dominantColor = getDominantColor(img);
      const watermarkColor = config.useCustomColor
        ? typeof config.customColor === "string"
          ? config.customColor
          : `rgba(${config.customColor.toRgb().r}, ${
              config.customColor.toRgb().g
            }, ${config.customColor.toRgb().b}, ${
              config.customColor.toRgb().a
            })`
        : getHighContrastColor(dominantColor);

      addWatermark(ctx, canvas, watermarkColor, config);
    });
  }, []);

  const debouncedApplyWatermark = useMemo(
    () => debounce((img: HTMLImageElement) => applyWatermark(img), 100),
    [applyWatermark]
  );

  const handleImageUpload = useCallback((file: File) => {
    const img = new Image();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return false;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      dominantColorRef.current = "";
      setLastImage(img);
      applyWatermark(img);
    };

    img.src = URL.createObjectURL(file);
    return false;
  }, []);

  const getHighContrastColor = (dominantColor: string): string => {
    const rgb = dominantColor.split(",").map(Number);
    const brightness = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
    return brightness > 186 ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)";
  };

  const addWatermark = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    textColor: string,
    config: WatermarkConfig
  ) => {
    const watermarkText = config.useCurrentTime
      ? new Date().toLocaleString()
      : config.text;

    ctx.font = `${config.fontSize}px Arial`;
    ctx.fillStyle = textColor;
    ctx.globalAlpha = config.opacity;

    const angle = (config.angle * Math.PI) / 180;
    const textWidth = ctx.measureText(watermarkText).width;
    const textHeight = config.fontSize;

    const cols = Math.ceil(canvas.width / (textWidth + config.spacing));
    const rows = Math.ceil(canvas.height / (textHeight + config.spacing));

    ctx.save();

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        ctx.save();
        ctx.translate(
          i * (textWidth + config.spacing),
          j * (textHeight + config.spacing)
        );
        ctx.rotate(angle);
        ctx.fillText(watermarkText, 0, 0);
        ctx.restore();
      }
    }

    ctx.restore();
    ctx.globalAlpha = 1.0;
  };

  const handleFormChange = (changedValues: Partial<WatermarkConfig>) => {
    if (lastImage) {
      if ("useCurrentTime" in changedValues) {
        debouncedApplyWatermark(lastImage);
      } else {
        debouncedApplyWatermark(lastImage);
      }
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Canvas 水印演示</Title>

      <Alert
        type="info"
        message="什么是智能水印？"
        description="智能水印是一种根据图片主色调自动调整水印颜色的技术。它通过分析图片的主要颜色，选择合适的对比度颜色作为水印，使水印既清晰可见又不会过分干扰原图的观感。"
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

        <Card title="水印配置">
          <Form
            form={form}
            initialValues={defaultConfig}
            onValuesChange={handleFormChange}
            layout="vertical"
          >
            <Form.Item
              label="使用当前时间"
              name="useCurrentTime"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="水印文本"
              name="text"
              rules={[{ required: true, message: "请输入水印文本" }]}
            >
              <Input placeholder="请输入水印文本" />
            </Form.Item>

            <Form.Item label="字体大小" name="fontSize">
              <Slider min={12} max={300} />
            </Form.Item>

            <Form.Item label="不透明度" name="opacity">
              <Slider min={0.1} max={1} step={0.1} />
            </Form.Item>

            <Form.Item label="旋转角度" name="angle">
              <Slider min={-180} max={180} />
            </Form.Item>

            <Form.Item label="间距" name="spacing">
              <Slider min={10} max={300} />
            </Form.Item>

            <Form.Item
              label="使用自定义颜色"
              name="useCustomColor"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item label="自定义颜色" name="customColor">
              <ColorPicker
                format="rgb"
                allowClear={false}
                onChange={(color) => {
                  form.setFieldValue("customColor", color);
                  if (lastImage) {
                    debouncedApplyWatermark(lastImage);
                  }
                }}
              />
            </Form.Item>
          </Form>
        </Card>

        <Card title="预览效果">
          <div className={styles.canvasWrapper}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
        </Card>

        <Card title="功能说明">
          <Paragraph>
            <Text strong>水印特点：</Text>
          </Paragraph>
          <ul>
            <li>自适应水印颜色（根据图片主色调）</li>
            <li>可自定义水印文本或使用时间戳</li>
            <li>可调整字体大小、透明度、角度</li>
            <li>可配置水印间距</li>
            <li>支持自定义水印颜色</li>
          </ul>

          <Paragraph>
            <Text strong>实现原理：</Text>
          </Paragraph>
          <ul>
            <li>使用 Canvas API 处理图片</li>
            <li>分析图片像素获取主色调</li>
            <li>计算对比度选择水印颜色</li>
            <li>使用变换矩阵实现旋转效果</li>
            <li>计算间距实现均匀分布</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

