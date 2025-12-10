import React, { useState, useRef } from 'react';
import { Upload, Card, Space, Typography, message, Spin } from 'antd';
import { InboxOutlined, CopyOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { ColorThief } from './utils';

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface ColorInfo {
  dominant: [number, number, number];
  palette: [number, number, number][];
}

export const Component: React.FC = () => {
  const [colors, setColors] = useState<ColorInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const colorThief = useRef(new ColorThief());

  const props: UploadProps = {
    accept: 'image/*',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        window.$message?.error('只能上传图片文件！');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        window.$message?.error('图片大小不能超过10MB！');
        return false;
      }
      return true;
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        setLoading(true);
        const imageFile = file as File;
        const imageUrl = URL.createObjectURL(imageFile);
        setImageUrl(imageUrl);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          try {
            const dominant = colorThief.current.getColor(img);
            const palette = colorThief.current.getPalette(img, 8);
            setColors({ dominant, palette });
            onSuccess?.(imageFile);
          } catch (error) {
            window.$message?.error('颜色提取失败，请重试');
            onError?.(error as Error);
          } finally {
            setLoading(false);
          }
        };

        img.onerror = () => {
          window.$message?.error('图片加载失败');
          setLoading(false);
          onError?.(new Error('图片加载失败'));
        };

        img.src = imageUrl;
      } catch (error) {
        window.$message?.error('上传失败，请重试');
        setLoading(false);
        onError?.(error as Error);
      }
    },
  };

  const copyToClipboard = async (color: [number, number, number]) => {
    const hex = `#${color.map(c => c.toString(16).padStart(2, '0')).join('')}`;
    try {
      await navigator.clipboard.writeText(hex);
      window.$message?.success(`颜色 ${hex} 已复制到剪贴板`);
    } catch (error) {
      window.$message?.error('复制失败，请手动复制');
    }
  };

  const rgbToHex = (rgb: [number, number, number]) => {
    return `#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`;
  };

  const getContrastColor = (rgb: [number, number, number]) => {
    const [r, g, b] = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Title level={2} className="text-center mb-8">
        图片颜色提取工具
      </Title>
      
      <Card className="mb-6">
        <Dragger {...props}>
          <div className="p-8">
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            </p>
            <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
            <p className="ant-upload-hint">
              支持 JPG、PNG、GIF 等常见图片格式，文件大小不超过10MB
            </p>
          </div>
        </Dragger>
      </Card>

      {loading && (
        <div className="text-center py-12">
          <Spin size="large" />
          <div style={{ marginTop: "16px", color: "#666" }}>正在提取颜色...</div>
        </div>
      )}

      {colors && imageUrl && !loading && (
        <Space direction="vertical" size="large" className="w-full">
          <Card title="上传图片">
            <div className="text-center">
              <img 
                src={imageUrl} 
                alt="上传的图片" 
                className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </Card>

          <Card title="主色调">
            <div className="flex items-center justify-center">
              <div
                className="w-32 h-32 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                style={{
                  backgroundColor: rgbToHex(colors.dominant),
                  color: getContrastColor(colors.dominant),
                }}
                onClick={() => copyToClipboard(colors.dominant)}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <Text strong className="text-lg">
                    {rgbToHex(colors.dominant)}
                  </Text>
                  <Text type="secondary" className="text-sm">
                    RGB({colors.dominant.join(', ')})
                  </Text>
                  <CopyOutlined className="mt-2" />
                </div>
              </div>
            </div>
          </Card>

          <Card title="调色板">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {colors.palette.map((color, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                  style={{
                    backgroundColor: rgbToHex(color),
                    color: getContrastColor(color),
                  }}
                  onClick={() => copyToClipboard(color)}
                >
                  <div className="flex flex-col items-center justify-center h-full p-2">
                    <Text strong className="text-xs">
                      {rgbToHex(color)}
                    </Text>
                    <Text type="secondary" className="text-xs">
                      {color.join(',')}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="颜色信息">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text strong>主色调：</Text>
                <div className="flex items-center gap-2 mt-1">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: rgbToHex(colors.dominant) }}
                  />
                  <Text code>{rgbToHex(colors.dominant)}</Text>
                  <Text code>RGB({colors.dominant.join(', ')})</Text>
                </div>
              </div>
              <div>
                <Text strong>调色板颜色数量：</Text>
                <Text>{colors.palette.length} 种</Text>
              </div>
            </div>
          </Card>
        </Space>
      )}
    </div>
  );
};

