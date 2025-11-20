import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Space,
  Badge,
  Avatar,
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import {
  SendOutlined,
  ReloadOutlined,
  DisconnectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

interface Message {
  content: string;
  type: "chat" | "system" | "history";
  userId: string;
  timestamp: string;
  messages?: Message[]; // 用于历史消息
}

export const Component = () => {
  const [form] = Form.useForm();
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const wsRef = useRef<WebSocket>();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // 生成用户ID
  const generateUserId = () => {
    // 从localStorage获取已存在的用户ID
    const existingUserId = localStorage.getItem("wsUserId");
    if (existingUserId) {
      return existingUserId;
    }
    // 生成新的用户ID
    const newUserId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem("wsUserId", newUserId);
    return newUserId;
  };

  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    setConnectLoading(true);

    const userId = generateUserId();
    setCurrentUserId(userId);

    // 在URL中添加用户ID
    wsRef.current = new WebSocket(`ws://localhost:3001?userId=${userId}`);
    wsRef.current.onopen = () => {
      setConnectLoading(false);
      setConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "error") {
          // 处理错误消息
          console.error("连接错误:", data.content);
          setMessages((prev) => [
            ...prev,
            {
              type: "system",
              content: data.content,
              userId: "system",
              timestamp: new Date().toISOString(),
            },
          ]);
          // 如果是ID重复错误，清除本地存储的ID并重新连接
          if (data.code === "DUPLICATE_ID") {
            localStorage.removeItem("wsUserId");
            handleReconnect();
          }
          return;
        }

        if (data.type === "system" && data.content === "连接成功") {
          setCurrentUserId(userId);
        }

        if (data.type === "history") {
          setMessages(data.messages);
        } else {
          setMessages((prev) => [...prev, data]);
        }

        // 滚动到最新消息
        setTimeout(() => {
          if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
              messageContainerRef.current.scrollHeight;
          }
        }, 100);
      } catch (error) {
        console.error("消息解析错误:", error);
      }
    };

    wsRef.current.onclose = () => {
      setConnected(false);
      setConnectLoading(false);

      setCurrentUserId("");
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content: "WebSocket 连接已断开",
          userId: "system",
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    wsRef.current.onerror = () => {
      setConnected(false);
      setConnectLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content: "WebSocket 连接发生错误",
          userId: "system",
          timestamp: new Date().toISOString(),
        },
      ]);
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const sendMessage = async () => {
    try {
      const { message } = await form.validateFields();
      if (!message.trim()) return;

      const messageData = {
        type: "chat",
        content: message,
        timestamp: new Date().toISOString(),
      };

      wsRef.current?.send(JSON.stringify(messageData));
      form.resetFields();
    } catch (error) {
      console.error("发送消息失败:", error);
    }
  };

  const handleDisconnect = () => {
    wsRef.current?.close();
  };

  const handleReconnect = () => {
    connectWebSocket();
  };

  const renderMessage = (msg: Message) => {
    const isCurrentUser = msg.userId === currentUserId;
    const isSystem = msg.type === "system";

    return (
      <div
        key={msg.timestamp}
        className={`${styles.message} ${
          isSystem
            ? styles.system
            : isCurrentUser
              ? styles.sent
              : styles.received
        }`}
      >
        {!isSystem && (
          <div className={styles.messageHeader}>
            <Avatar
              size="small"
              icon={<UserOutlined />}
              style={{
                backgroundColor: isCurrentUser ? "#1890ff" : "#52c41a",
              }}
            />
            <Text type="secondary" className={styles.userId}>
              {isCurrentUser ? "我" : `用户 ${msg.userId}`}
            </Text>
          </div>
        )}
        <div className={styles.messageTime}>
          {new Date(msg.timestamp).toLocaleTimeString()}
        </div>
        <div className={styles.messageContent}>{msg.content}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Card>
        <Title level={2}>WebSocket 聊天室</Title>
        <Paragraph>
          这是一个多用户实时聊天室，支持用户之间的实时通信。
        </Paragraph>

        <div className={styles.status}>
          <div
            className={`${styles.statusDot} ${
              connected ? styles.connected : styles.disconnected
            }`}
          />
          <Text>{connected ? "已连接" : "未连接"}</Text>
          {currentUserId && (
            <Text type="secondary" style={{ marginLeft: 8 }}>
              我的ID: {currentUserId}
            </Text>
          )}
        </div>

        <div className={styles.controls}>
          <Button
            type="primary"
            danger={connected}
            loading={connectLoading}
            icon={connected ? <DisconnectOutlined /> : <ReloadOutlined />}
            onClick={connected ? handleDisconnect : handleReconnect}
          >
            {connected ? "断开连接" : "重新连接"}
          </Button>
        </div>

        <Form form={form} onFinish={sendMessage}>
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item
              name="message"
              style={{ flex: 1, marginBottom: 0 }}
              rules={[{ required: true, message: "请输入消息内容" }]}
            >
              <Input
                placeholder="输入要发送的消息"
                onPressEnter={sendMessage}
                disabled={!connected}
              />
            </Form.Item>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={sendMessage}
              disabled={!connected}
            >
              发送
            </Button>
          </Space.Compact>
        </Form>

        <div className={styles.messageContainer} ref={messageContainerRef}>
          {messages.map(renderMessage)}
        </div>
      </Card>
    </div>
  );
}
