import { FC, useState } from "react";
import "./index.css";
import { Typography, Card, Alert, Divider, Space, Button } from "antd";
import bg4 from "./jpg/bg-4.jpg";
import { blurDataURL } from "./blur-previews/bg4";
const { Title, Paragraph, Text } = Typography;

interface Props {
  src: string; // 高清图片
  lowQualitySrc: string; // 低质量图片
  width?: number | string;
  height?: number | string;
}

const ProgressiveImg: FC<Props> = ({
  src,
  lowQualitySrc,
  width = "100%",
  height = 400,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="progressive" style={{ width, height }}>
      {/* 低质量图片，立即显示 */}
      <img src={lowQualitySrc} className="img preview" alt="low quality" />
      {/* 高清原图，加载完成后慢慢显示 */}
      <img
        src={src}
        className={`img original ${isLoaded ? "loaded" : ""}`}
        onLoad={() => setIsLoaded(true)}
        alt="high quality"
      />
    </div>
  );
};

export const Component = () => {
  const [demoKey, setDemoKey] = useState<number>(0);

  const handleRestart = () => {
    setDemoKey((prev) => prev + 1);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>渐进式图片加载演示</Title>

      <Alert
        type="info"
        message="什么是渐进式图片加载？"
        description="渐进式图片加载是一种图片加载优化技术，先加载低质量的图片作为占位，然后逐步加载更高质量的图片。这种方式可以让用户更快地看到页面内容，提升用户体验。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card
          title="演示效果"
          extra={
            <Button type="primary" onClick={handleRestart}>
              重新演示
            </Button>
          }
        >
          <ProgressiveImg
            key={demoKey}
            src={bg4}
            lowQualitySrc={blurDataURL}
            height={400}
          />
          <Divider />
          <Paragraph>
            <Text strong>加载过程说明：</Text>
          </Paragraph>
          <ol>
            <li>首先加载最低质量图片（约 5KB）</li>
            <li>然后加载中等质量图片（约 20KB）</li>
            <li>接着加载高质量图片（约 50KB）</li>
            <li>最后加载原图（约 100KB）</li>
          </ol>
        </Card>

        <Card title="使用方法">
          <Paragraph>
            <Text strong>组件使用示例：</Text>
          </Paragraph>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            {`import { ProgressiveImg } from './components';

// 准备高清图片和对应的低质量图片
const highQualityImg = '/images/photo-hq.jpg';
const lowQualityImg = '/images/photo-lq.jpg';  // 压缩后的小图

// 使用组件
<ProgressiveImg 
  src={highQualityImg}
  lowQualitySrc={lowQualityImg}
  width="100%"
  height={400}
/>`}
          </pre>

          <Divider />

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>低质量图片建议压缩到 5-10KB 大小，以实现快速加载</li>
            <li>可以使用图片压缩工具（如 TinyPNG）生成低质量版本</li>
            <li>过渡时间可以通过 CSS 的 transition 属性调整</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

