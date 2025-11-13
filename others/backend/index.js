const express = require("express");
const WebSocket = require("ws");
const url = require("url");

const app = express();
const port = 3001;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });

// 存储所有连接的客户端
const clients = new Map();

// 存储消息历史记录
const messageHistory = [];

// 验证用户ID是否可用
const validateUserId = (userId) => {
  // 检查ID是否已存在
  if (clients.has(userId)) {
    return false;
  }
  return true;
};

// 发送历史消息给新连接的客户端
const sendHistoryMessages = (ws) => {
  if (messageHistory.length > 0) {
    ws.send(
      JSON.stringify({
        type: "history",
        messages: messageHistory,
      })
    );
  }
};

wss.on("connection", (ws, req) => {
  // 从URL中获取用户ID
  const parameters = url.parse(req.url, true);
  const userId = parameters.query.userId;

  // 验证用户ID
  if (!userId || !validateUserId(userId)) {
    ws.send(
      JSON.stringify({
        type: "error",
        code: "DUPLICATE_ID",
        content: "用户ID已存在或无效，请重新连接",
      })
    );
    ws.close();
    return;
  }

  // 存储客户端连接
  clients.set(userId, ws);

  console.log(`用户 ${userId} 已连接`);

  // 发送连接成功消息
  ws.send(
    JSON.stringify({
      type: "system",
      content: `${userId}连接成功`,
      userId: userId,
      timestamp: new Date().toISOString(),
    })
  );

  // 发送历史消息
  sendHistoryMessages(ws);

  // 广播新用户加入消息
  const joinMessage = {
    type: "system",
    content: `新用户 ${userId} 加入了聊天室`,
    userId: "system",
    timestamp: new Date().toISOString(),
  };

  messageHistory.push(joinMessage);
  broadcastMessage(joinMessage);

  // 监听客户端发送的消息
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      const chatMessage = {
        type: "chat",
        content: data.content,
        userId: userId,
        timestamp: new Date().toISOString(),
      };

      messageHistory.push(chatMessage);

      if (messageHistory.length > 100) {
        messageHistory.shift();
      }

      broadcastMessage(chatMessage);
    } catch (error) {
      console.error("消息解析错误:", error);
    }
  });

  // 监听连接关闭事件
  ws.on("close", () => {
    clients.delete(userId);
    console.log(`用户 ${userId} 已断开连接`);

    const leaveMessage = {
      type: "system",
      content: `用户 ${userId} 离开了聊天室`,
      userId: "system",
      timestamp: new Date().toISOString(),
    };

    messageHistory.push(leaveMessage);
    broadcastMessage(leaveMessage);
  });
});

// 广播消息给所有客户端
function broadcastMessage(message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}
