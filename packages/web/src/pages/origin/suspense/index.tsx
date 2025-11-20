import React, { lazy, Suspense, useState } from "react";
import { Typography, Card, Alert, Space, Button, Spin, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const LoadBox = () => {
  const SlowComponent = lazy(
    () =>
      new Promise<typeof import("./SlowComponent")>((resolve) => {
        setTimeout(() => {
          resolve(import("./SlowComponent"));
        }, 2000);
      })
  );
  return (
    <Card title="加载区域" style={{ marginTop: 16 }}>
      <Suspense fallback={<BigSpinner />}>
        <SlowComponent />
      </Suspense>
    </Card>
  );
};
const BigSpinner = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      tip="Loading..."
    />
  </div>
);

export const Component = () => {
  const [key, setKey] = useState(0); // 添加 key 来强制重新渲染

  const handleReset = () => {
    // 短暂延迟后重新显示，确保组件完全卸载
    setTimeout(() => {
      setKey((k) => k + 1);
    }, 100);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>React Suspense 演示</Title>

      <Alert
        type="info"
        message="什么是 React Suspense？"
        description="Suspense 是 React 提供的一种内置机制，用于优雅地处理异步操作（如数据加载、组件延迟加载等）。它允许我们在内容加载完成之前展示一个加载状态，提升用户体验。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card
          title="演示效果"
          extra={
            <Space>
              <Button onClick={handleReset}>重新演示</Button>
            </Space>
          }
        >
          <LoadBox key={key} />
        </Card>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>基本概念：</Text>
          </Paragraph>
          <ul>
            <li>Suspense 包裹可能需要等待的内容</li>
            <li>fallback 属性指定加载状态的展示内容</li>
            <li>可以配合 lazy 实现组件的动态加载</li>
            <li>支持嵌套使用，形成加载边界</li>
          </ul>

          <Divider />

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
            {`// 1. 使用 lazy 定义需要延迟加载的组件
const SlowComponent = lazy(() => import('./SlowComponent'));

// 2. 使用 Suspense 包裹可能暂停的内容
function MyComponent() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SlowComponent />
    </Suspense>
  );
}`}
          </pre>

          <Divider />

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>确保 fallback 组件是一个轻量级的加载指示器</li>
            <li>可以在不同层级使用 Suspense 来细化加载边界</li>
            <li>建议配合 ErrorBoundary 处理加载错误</li>
            <li>React 18 中对 Suspense 有更好的并发渲染支持</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

