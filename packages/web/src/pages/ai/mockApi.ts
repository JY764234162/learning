/**
 * 模拟流式 API 请求
 * @param content 用户输入的内容
 * @returns ReadableStream
 */
export const mockStreamApi = (content: string): ReadableStream<Uint8Array> => {
  const mockResponseText = `这是对 "${content}" 的模拟流式回复。\n\nAnt Design X 是一个专注于 AI 场景的组件库，提供了 Bubble, Sender, Conversations 等组件。\n\n这段文字是通过前端 ReadableStream 模拟生成的流式数据。`;

  return new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const chars = mockResponseText.split("");
      let i = 0;

      const intervalId = setInterval(() => {
        if (i < chars.length) {
          // 每次发送 1 个字符
          const chunkSize = 1;
          const chunk = chars.slice(i, i + chunkSize).join("");

          const sseData = `${JSON.stringify({ content: chunk })}`;
          controller.enqueue(encoder.encode(sseData));

          i += chunkSize;
        } else {
          // 发送结束事件（可选，视具体协议而定）
          // controller.enqueue(encoder.encode("event: close\ndata: [DONE]\n\n"));
          controller.close();
          clearInterval(intervalId);
        }
      }, 50);
    },
  });
};
