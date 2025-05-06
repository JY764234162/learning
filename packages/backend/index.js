const express = require("express");
const WebSocket = require("ws"); // 创建 Express 应用
//
//

const app = express();
const port = 3001;
// 启动 Express 服务器

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });
//监听 WebSocket 连接事件

wss.on("connection", (ws) => {
  console.log("Client connected");
  // 监听客户端发送的消息
  ws.on("message", (message) => {
    console.log(`Received: ${message}`); // 将消息广播给所有连接的客户端
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }); // 监听连接关闭事件
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
// AI写代码
