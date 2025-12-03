import React, { useState, useEffect, useRef } from "react";
import { Bubble, Conversations, Sender, type ConversationsProps } from "@ant-design/x";
import { UserOutlined, PlusOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Layout, theme, Empty, Flex, Avatar } from "antd";
const { Sider, Content } = Layout;

// 模拟类型定义
interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
  status?: "loading" | "success" | "error";
  timestamp: number;
}

interface Session {
  key: string;
  label: string;
  timestamp: number;
}

// 模拟初始数据
const INITIAL_SESSIONS: Session[] = [
  { key: "1", label: "关于 React 的讨论", timestamp: Date.now() },
  { key: "2", label: "代码优化建议", timestamp: Date.now() - 1000000 },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "2",
      content: "useEffect 是 React 中用于处理副作用的 Hook。它在组件渲染后执行，可以用于数据获取、订阅或手动修改 DOM 等操作。",
      role: "ai",
      timestamp: Date.now() - 40000,
    },
    {
      id: "1",
      content: "React 的 useEffect 怎么使用？",
      role: "user",
      timestamp: Date.now() - 50000,
    },
  ],
  "2": [
    {
      id: "3",
      content: "这段代码怎么优化？",
      role: "user",
      timestamp: Date.now() - 1000000,
    },
  ],
};

import { mockStreamApi } from "./mockApi";

export const Component = () => {
  const { token } = theme.useToken();

  // 状态管理
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // 滚动到底部的引用
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeKey]);

  const currentMessages = messages[activeKey] || [];

  // 新建会话
  const handleAddSession = () => {
    const newSessionId = Date.now().toString();
    const newSession: Session = {
      key: newSessionId,
      label: "新对话",
      timestamp: Date.now(),
    };
    setSessions([newSession, ...sessions]);
    setMessages((prev) => ({ ...prev, [newSessionId]: [] }));
    setActiveKey(newSessionId);
  };

  // 删除会话
  const handleDeleteSession = (key: string) => {
    const newSessions = sessions.filter((s) => s.key !== key);
    setSessions(newSessions);

    // 如果删除的是当前选中的，切换到第一个
    if (activeKey === key) {
      if (newSessions.length > 0) {
        setActiveKey(newSessions[0].key);
      } else {
        setActiveKey("");
      }
    }
  };

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || !activeKey) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: Date.now(),
    };

    // 更新消息列表
    setMessages((prev) => ({
      ...prev,
      [activeKey]: [userMsg, ...(prev[activeKey] || [])],
    }));

    setInputValue("");
    setLoading(true);

    // 更新会话标题（如果是第一条消息）
    if (currentMessages.length === 0) {
      setSessions((prev) => prev.map((s) => (s.key === activeKey ? { ...s, label: inputValue.slice(0, 10) } : s)));
    }

    // 创建一个空的 AI 消息占位
    const aiMsgId = (Date.now() + 1).toString();
    const initialAiMsg: Message = {
      id: aiMsgId,
      content: "",
      role: "ai",
      status: "loading",
      timestamp: Date.now(),
    };

    setMessages((prev) => ({
      ...prev,
      [activeKey]: [initialAiMsg, ...(prev[activeKey] || [])],
    }));

    // 前端模拟流式响应，使用 fetchEventSource
    // 由于 fetchEventSource 需要一个真实的 URL，我们创建一个 Blob URL 来模拟
    const stream = mockStreamApi(userMsg.content);
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = JSON.parse(decoder.decode(value, { stream: true })).content;
      console.log(text)
      fullText += text;
      setMessages((prev) => ({
        ...prev,
        [activeKey]: [
          {
            id: aiMsgId,
            content: fullText,
            role: "ai",
            status: "success",
            timestamp: Date.now(),
          },
          ...prev[activeKey].filter((msg) => msg.id !== aiMsgId),
        ],
      }));
    }
  };

  // Conversations 组件的 items 配置
  const conversationItems: ConversationsProps["items"] = sessions.map((session) => ({
    key: session.key,
    label: session.label,
    icon: <MessageOutlined />,
    group: "历史记录",
  }));

  // 处理菜单点击
  const handleMenuChange: ConversationsProps["onActiveChange"] = (key) => {
    setActiveKey(key);
  };

  return (
    <Layout style={{ height: "100%", width: "100%", background: "#fff", overflow: "hidden" }}>
      <Sider
        width={280}
        theme="light"
        style={{
          background: "#f5f5f5",
          borderRight: "1px solid rgba(0, 0, 0, 0.06)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ padding: "12px" }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSession} block>
            新对话
          </Button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 12px" }}>
          <Conversations
            items={conversationItems}
            activeKey={activeKey}
            onActiveChange={handleMenuChange}
            menu={(item) => ({
              items: [
                {
                  label: "删除会话",
                  key: "delete",
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => handleDeleteSession(item.key),
                },
              ],
            })}
          />
        </div>
      </Sider>

      <Content style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", background: "#fff" }}>
        {activeKey ? (
          <>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px",
                height: "calc(100% - 100px)", // 减去底部输入框的高度
              }}
            >
              <Bubble.List
                items={currentMessages.map((msg) => ({
                  key: msg.id,
                  content: msg.content,
                  role: msg.role,
                  variant: msg.role === "user" ? "shadow" : "filled",
                  placement: msg.role === "user" ? "end" : "start",
                  avatar: (
                    <Avatar
                      icon={msg.role === "user" ? <UserOutlined /> : <MessageOutlined />}
                      style={{
                        backgroundColor: msg.role === "user" ? token.colorInfo : token.colorPrimary,
                      }}
                    />
                  ),
                  loading: msg.status === "loading",
                }))}
              />
              <div ref={messagesEndRef} />
            </div>

            <div
              style={{
                padding: "24px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                // 移除绝对定位，使用 Flex 布局
                zIndex: 10,
              }}
            >
              <Sender
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSend}
                loading={loading}
                placeholder="输入消息与 AI 对话..."
              />
            </div>
          </>
        ) : (
          <Flex justify="center" align="center" style={{ height: "100%" }}>
            <Empty description="选择或创建一个新会话开始聊天" />
          </Flex>
        )}
      </Content>
    </Layout>
  );
};
