import React from "react";
import { Typography, Card, Alert, Space, Tag, Divider } from "antd";
import { useOnlineStatus } from "./useOnlineStatus";
import { CheckCircleOutlined, DisconnectOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const NetworkStatus = () => {
  const isOnline = useOnlineStatus();

  return (
    <Card style={{ marginTop: 16 }}>
      <Space direction="vertical">
        <div>
          <Text strong>当前网络状态：</Text>
          <Tag
            color={isOnline ? "#52c41a" : "#f5222d"}
            style={{ marginLeft: 8 }}
          >
            {isOnline ? (
              <>
                <CheckCircleOutlined /> 在线
              </>
            ) : (
              <>
                <DisconnectOutlined /> 离线
              </>
            )}
          </Tag>
        </div>
        <Text type="secondary">
          尝试切换网络连接（开启/关闭 WiFi）来查看状态变化
        </Text>
      </Space>
    </Card>
  );
};

export const Component = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>useSyncExternalStore Hook 演示</Title>

      <Alert
        type="info"
        message="什么是 useSyncExternalStore？"
        description="useSyncExternalStore 是 React 18 引入的新 Hook，用于订阅外部数据源。它提供了一种安全的方式来读取和订阅外部数据，确保在并发渲染中数据的一致性。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="演示效果">
          <NetworkStatus />
        </Card>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>Hook 参数说明：</Text>
          </Paragraph>
          <ul>
            <li>subscribe: 订阅函数，当数据源发生变化时调用回调</li>
            <li>getSnapshot: 返回当前状态的函数</li>
            <li>getServerSnapshot: (可选) 用于服务端渲染</li>
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
            {`import { useSyncExternalStore } from 'react';

// 1. 创建获取状态的函数
function getSnapshot() {
  return navigator.onLine;
}

// 2. 创建订阅函数
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// 3. 创建自定义 Hook
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot
  );
  return isOnline;
}`}
          </pre>

          <Divider />

          <Paragraph>
            <Text strong>适用场景：</Text>
          </Paragraph>
          <ul>
            <li>订阅浏览器 API（如网络状态、地理位置等）</li>
            <li>订阅第三方状态管理库（Redux、MobX等）</li>
            <li>订阅 WebSocket 或其他实时数据源</li>
            <li>需要在并发渲染中保持数据一致性的场景</li>
          </ul>

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>确保 subscribe 函数返回清理函数</li>
            <li>getSnapshot 应该返回不可变的数据</li>
            <li>避免在 getSnapshot 中进行复杂计算</li>
            <li>考虑使用 selector 优化性能</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

