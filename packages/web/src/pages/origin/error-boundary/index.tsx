import React, { useState } from "react";
import { Typography, Card, Alert, Space, Button, Divider } from "antd";
import ErrorBoundary from "./components/ErrorBoundary";
import BuggyCounter from "./components/BuggyCounter";
import AsyncError from "./components/AsyncError";
import NetworkError from "./components/NetworkError";
import ValidationError from "./components/ValidationError";

const { Title, Paragraph, Text } = Typography;

export const Component = () => {
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((k) => k + 1);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>错误边界演示</Title>

      <Alert
        type="info"
        message="错误类型演示"
        description="演示不同类型错误的处理方式：渲染错误、异步错误、网络错误、表单验证错误"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card
          title="错误边界演示"
          extra={
            <Button type="primary" onClick={handleReset}>
              重置所有组件
            </Button>
          }
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <ErrorBoundary key={`eb1-${key}`}>
              <BuggyCounter />
            </ErrorBoundary>

            <Divider />

            <ErrorBoundary key={`eb2-${key}`}>
              <AsyncError />
            </ErrorBoundary>

            <Divider />

            <ErrorBoundary key={`eb3-${key}`}>
              <NetworkError />
            </ErrorBoundary>

            <Divider />

            <ErrorBoundary key={`eb4-${key}`}>
              <ValidationError />
            </ErrorBoundary>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

