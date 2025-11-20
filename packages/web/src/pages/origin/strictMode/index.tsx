import React, { useState, useEffect } from "react";
import { Typography, Card, Alert, Space, Button, Divider } from "antd";
import { createConnection } from "./chat";

const { Title, Paragraph, Text } = Typography;

const serverUrl = "https://localhost:1234";
const roomId = "general";

const Chat = () => {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);

  return (
    <Card style={{ marginTop: 16 }}>
      <Text>当前连接到 {roomId} 聊天室</Text>
      <div style={{ color: "#666", marginTop: 8 }}>
        请查看控制台以观察连接/断开的过程
      </div>
    </Card>
  );
};

export const Component = () => {
  const [showChat, setShowChat] = useState(false);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setShowChat(false);
    setTimeout(() => {
      setKey((k) => k + 1);
      setShowChat(true);
    }, 100);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>React Strict Mode 演示</Title>

      <Alert
        type="info"
        message="什么是 Strict Mode？"
        description="Strict Mode 是 React 的开发模式工具，用于突出显示应用程序中潜在的问题。它通过故意双重调用某些生命周期方法和 Hooks，帮助发现副作用清理不当的问题。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card
          title="演示效果"
          extra={
            <Space>
              <Button type="primary" onClick={() => setShowChat(!showChat)}>
                {showChat ? "断开连接" : "建立连接"}
              </Button>
              <Button onClick={handleReset} disabled={!showChat}>
                重新连接
              </Button>
            </Space>
          }
        >
          <React.StrictMode>{showChat && <Chat key={key} />}</React.StrictMode>
        </Card>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>Strict Mode 会检查：</Text>
          </Paragraph>
          <ul>
            <li>意外的副作用</li>
            <li>过时的生命周期方法</li>
            <li>不安全的生命周期方法</li>
            <li>过时的 API 使用</li>
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
            {`// 1. 启用 Strict Mode
<React.StrictMode>
  <App />
</React.StrictMode>

// 2. 正确处理副作用清理
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  
  return () => {
    connection.disconnect(); // 清理副作用
  };
}, []);`}
          </pre>

          <Divider />

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>Strict Mode 只在开发环境下生效</li>
            <li>组件的 useEffect 会被调用两次</li>
            <li>必须正确清理所有副作用</li>
            <li>可以帮助发现内存泄漏问题</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

