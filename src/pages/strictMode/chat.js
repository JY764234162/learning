let connections = 0;

export function createConnection(serverUrl, roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log(
        '✅ 连接到 "' + roomId + '" 聊天室，位于' + serverUrl + "..."
      );
      connections++;
      console.log("活跃连接数: " + connections);
    },
    disconnect() {
      console.log('❌ 断开 "' + roomId + '" 聊天室，位于' + serverUrl);
      connections--;
      console.log("活跃连接数: " + connections);
    },
  };
}
