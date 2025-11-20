import React, { useEffect, useRef } from "react";
import { Typography, Card, Alert, Space, Button } from "antd";

const { Title, Paragraph, Text } = Typography;

export const Component = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleScrollToTarget = () => {
    targetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });

    targetRef.current?.animate(
      {
        backgroundColor: ["transparent", "yellow", "transparent"],
      },
      {
        duration: 3000,
        easing: "ease-in-out",
      }
    );
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>滚动和高亮效果演示</Title>

      <Alert
        type="info"
        message="什么是平滑滚动和高亮？"
        description="平滑滚动（Smooth Scroll）是一种页面滚动效果，它可以让页面滚动更加流畅自然。结合元素高亮效果，可以帮助用户快速定位和关注重要内容。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="演示效果">
          <Button type="primary" onClick={handleScrollToTarget}>
            滚动到目标元素
          </Button>

          <div
            style={{
              height: "400px",
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
              marginTop: "16px",
              overflow: "auto",
            }}
          >
            {/* 上半部分元素 */}
            {Array(20)
              .fill("")
              .map((_, index) => (
                <div
                  key={`top-${index}`}
                  style={{
                    padding: "16px",
                    margin: "8px",
                    background: "#fafafa",
                    borderRadius: "4px",
                  }}
                >
                  Item {index + 1}
                </div>
              ))}

            {/* 目标元素 */}
            <div
              ref={targetRef}
              style={{
                padding: "20px",
                margin: "8px",
                background: "#fff",
                border: "1px solid #1890ff",
                borderRadius: "4px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              目标元素
            </div>

            {/* 下半部分元素 */}
            {Array(20)
              .fill("")
              .map((_, index) => (
                <div
                  key={`bottom-${index}`}
                  style={{
                    padding: "16px",
                    margin: "8px",
                    background: "#fafafa",
                    borderRadius: "4px",
                  }}
                >
                  Item {index + 21}
                </div>
              ))}
          </div>
        </Card>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>API 说明：</Text>
          </Paragraph>
          <ul>
            <li>
              <Text code>scrollIntoView()</Text>: 将元素滚动到可视区域
              <ul>
                <li>behavior: &quot;smooth&quot; - 平滑滚动</li>
                <li>block: &quot;center&quot; - 垂直居中对齐</li>
                <li>inline: &quot;center&quot; - 水平居中对齐</li>
              </ul>
            </li>
            <li>
              <Text code>element.animate()</Text>: 创建动画效果
              <ul>
                <li>第一个参数定义关键帧</li>
                <li>第二个参数设置动画配置</li>
              </ul>
            </li>
          </ul>

          <Paragraph>
            <Text strong>代码示例：</Text>
          </Paragraph>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            {`const targetRef = useRef<HTMLDivElement>(null);

// 滚动到目标元素
targetRef.current?.scrollIntoView({
  behavior: "smooth",
  block: "center",
  inline: "center"
});

// 添加高亮动画
targetRef.current?.animate(
  {
    backgroundColor: ["transparent", "yellow", "transparent"]
  },
  {
    duration: 3000,
    easing: "ease-in-out"
  }
);`}
          </pre>

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>确保目标元素已经被渲染到DOM中</li>
            <li>注意浏览器对这些API的兼容性支持</li>
            <li>可以根据需要调整动画时间和效果</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};
