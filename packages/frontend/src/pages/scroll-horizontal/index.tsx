import React, { useEffect, useRef, useState } from "react";
import { Typography, Card, Alert, Space, Flex, Slider, Form } from "antd";
import styles from "./style.module.css";
const { Title, Paragraph, Text } = Typography;

const imgUrlList = [
  "https://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  "https://gips3.baidu.com/it/u=100751361,1567855012&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  "https://gips3.baidu.com/it/u=2489404253,92500118&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  "https://gips0.baidu.com/it/u=1939859157,1111239881&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f600_800",
  "https://gips3.baidu.com/it/u=1930947562,702557436&fm=3028&app=3028&f=JPEG&fmt=auto?w=1920&h=2560",
  "https://gips0.baidu.com/it/u=1370402140,2009956566&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  "https://gips3.baidu.com/it/u=1874299413,3253595329&fm=3028&app=3028&f=JPEG&fmt=auto?w=1920&h=2560",
  "https://gips3.baidu.com/it/u=2475428638,3303591043&fm=3028&app=3028&f=JPEG&fmt=auto?w=1920&h=2560",
  "https://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  "https://gips3.baidu.com/it/u=100751361,1567855012&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  "https://gips3.baidu.com/it/u=2489404253,92500118&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  "https://gips0.baidu.com/it/u=1939859157,1111239881&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f600_800",
  "https://gips3.baidu.com/it/u=1930947562,702557436&fm=3028&app=3028&f=JPEG&fmt=auto?w=1920&h=2560",
  "https://gips0.baidu.com/it/u=1370402140,2009956566&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  "https://gips3.baidu.com/it/u=1874299413,3253595329&fm=3028&app=3028&f=JPEG&fmt=auto?w=1920&h=2560",
  "https://gips3.baidu.com/it/u=2475428638,3303591043&fm=3028&app=3028&f=JPEG&fmt=auto?w=1920&h=2560",
];

const ScrollDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1); // 添加滚动速度状态

  const onHorizontalScroll = (event: any) => {
    if (scrollRef.current) {
      event.preventDefault();
      // 使用 scrollSpeed 参数调整滚动速度
      scrollRef.current.scrollLeft += (event.deltaY / 10) * scrollSpeed;
    }
  };

  useEffect(() => {
    scrollRef.current?.addEventListener("wheel", onHorizontalScroll);
    return () => {
      scrollRef.current?.removeEventListener("wheel", onHorizontalScroll);
    };
  }, [scrollSpeed]); // 添加 scrollSpeed 依赖

  // 添加参数配置面板
  const renderOptionsPanel = () => (
    <Card title="参数配置" style={{ marginBottom: 16 }}>
      <Form layout="vertical">
        <Form.Item
          label="滚动速度"
          tooltip="控制水平滚动时的速度，值越大滚动越快"
        >
          <Slider
            min={0.1}
            max={3}
            step={0.1}
            value={scrollSpeed}
            onChange={setScrollSpeed}
            marks={{
              0.1: "0.1x",
              1: "1x",
              2: "2x",
              3: "3x",
            }}
          />
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>滚动和高亮效果演示</Title>

      <Alert
        type="info"
        message="什么是平滑滚动和高亮？"
        description="平滑滚动（Smooth Scroll）是一种页面滚动效果，它可以让页面滚动更加流畅自然。结合元素高亮效果，可以帮助用户快速定位和关注重要内容。您可以通过下方的滑块调整滚动速度。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        {renderOptionsPanel()}

        <div ref={scrollRef} className={styles.scrollContainer}>
          {/* 上半部分元素 */}
          {imgUrlList.map((item, index) => (
            <Flex
              justify="center"
              align="center"
              key={index}
              style={{
                flexShrink: 0,
                background: "#fafafa",
                borderRadius: "4px",
                flexBasis: "100px",
                height: "100%",
              }}
            >
              <img style={{ width: "100%" }} src={item}></img>
            </Flex>
          ))}
        </div>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>滚动速度控制：</Text>
          </Paragraph>
          <ul>
            <li>使用滑块可以调整滚动速度（0.1x - 3x）</li>
            <li>速度值越大，滚动越快</li>
            <li>默认速度为 1x</li>
          </ul>

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>确保目标元素已经被渲染到DOM中</li>
            <li>注意浏览器对这些API的兼容性支持</li>
            <li>可以根据需要调整动画时间和效果</li>
            <li>滚动速度调整会实时生效</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

export default ScrollDemo;
