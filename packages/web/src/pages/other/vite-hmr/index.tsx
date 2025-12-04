import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Alert,
  Space,
  Button,
  Input,
  message,
  Divider,
} from "antd";
import { SendOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export const Component = () => {
  const [messageText, setMessageText] = useState("Hello from client!");
  const [serverResponse, setServerResponse] = useState<string[]>([]);

  useEffect(() => {
    if (import.meta.hot) {
      // 监听来自服务器的消息
      import.meta.hot.on("vite:from-server", (data) => {
        setServerResponse((prev) => [...prev, data.msg]);
      });
    }
  }, []);

  const handleSendMessage = () => {
    if (import.meta.hot) {
      import.meta.hot.send("vite:from-client", { msg: messageText });
      window.$message?.success("消息已发送到服务器");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Vite HMR 通信演示</Title>

      <Alert
        type="info"
        message="什么是 Vite HMR 通信？"
        description="Vite 的热模块替换（HMR）不仅支持模块的热更新，还提供了客户端和开发服务器之间的双向通信机制。这使得我们可以在开发过程中实现更复杂的调试和开发功能。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="演示效果">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Text strong>发送消息到服务器：</Text>
              <TextArea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{ marginTop: 8 }}
                rows={4}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                style={{ marginTop: 8 }}
              >
                发送消息
              </Button>
            </div>

            <div style={{ marginTop: 16 }}>
              <Text strong>服务器响应：</Text>
              <Card
                size="small"
                style={{ marginTop: 8, background: "#f6f8fa" }}
              >
                {serverResponse.length > 0 ? (
                  serverResponse.map((msg, index) => (
                    <div key={index}>{msg}</div>
                  ))
                ) : (
                  <Text type="secondary">等待服务器响应...</Text>
                )}
              </Card>
            </div>
          </Space>
        </Card>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>配置说明：</Text>
          </Paragraph>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            {`// vite.config.ts
export default defineConfig({
  server: {
    hmr: {
      // 配置 HMR 连接
      host: 'localhost',
      port: 3000,
    },
  },
  plugins: [{
    name: 'hmr-communication',
    configureServer(server) {
      server.ws.on('vite:from-client', (data, client) => {
        // 处理来自客户端的消息
        console.log('收到客户端消息:', data.msg);
        // 发送响应回客户端
        client.send('vite:from-server', {
          msg: \`服务器收到消息: \${data.msg}\`
        });
      });
    }
  }]
})`}
          </pre>

          <Divider />

          <Paragraph>
            <Text strong>客户端代码示例：</Text>
          </Paragraph>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            {`// 发送消息到服务器
if (import.meta.hot) {
  import.meta.hot.send('vite:from-client', {
    msg: 'Hello from client!'
  });
}

// 监听服务器消息
if (import.meta.hot) {
  import.meta.hot.on('vite:from-server', (data) => {
    console.log('收到服务器消息:', data.msg);
  });
}`}
          </pre>

          <Divider />

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>HMR 通信仅在开发环境下可用</li>
            <li>确保消息事件名称不与 Vite 内部事件冲突</li>
            <li>避免发送过大的数据量</li>
            <li>注意处理连接断开的情况</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

