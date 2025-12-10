import React from "react";
import { Typography, Card, Space } from "antd";
import LazyImage from "./components/LazyImage";

const { Title, Paragraph } = Typography;

// 生成一些示例图片
const images = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/200/200?random=${i}`,
  alt: `Random Image ${i}`,
}));

export const Component = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>图片懒加载演示</Title>

      <Paragraph>
        向下滚动页面，图片会在进入视口时才开始加载。这可以优化页面的初始加载性能，
        特别是在有大量图片的页面中。
      </Paragraph>
      <Card>
        <Card title="图片列表">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {images.map((image) => (
              <div key={image.id} style={{ textAlign: "center" }}>
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={200}
                />
                <Paragraph style={{ marginTop: 8 }}>
                  图片 {image.id + 1}
                </Paragraph>
              </div>
            ))}
          </Space>
        </Card>
      </Card>
    </div>
  );
};
