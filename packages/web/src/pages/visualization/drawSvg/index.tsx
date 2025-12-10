import React, { useEffect, useRef, useState } from "react";
import { Typography, Card, Alert, Space, Button, Slider, Input } from "antd";
import ModalButton from "./modalButton";
import ChatBubbleSvg from "./ChatBubbleSvg";
const { Title, Paragraph, Text } = Typography;

export const Component = () => {
  const ref = useRef<SVGPathElement>(null);
  const animRef = useRef<Animation>();
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const length = ref.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  const onAnimate = async (revrese = false) => {
    if (!ref.current) return;
    const anim = ref.current.animate(
      {
        strokeDashoffset: revrese ? [0, pathLength] : [pathLength, 0],
      },
      {
        duration: 2000,
        easing: "ease-in-out",
      }
    );
    animRef.current = anim;
  };

  const onPause = () => {
    if (!animRef.current) return;
    animRef.current.pause();
  };

  // 自定义聊天框参数状态
  const [chatBubbleParams, setChatBubbleParams] = useState({
    width: 200,
    height: 130,
    borderRadius: 20,
    strokeWidth: 4,
    arrowWidth: 40,
    arrowHeight: 30,
    enableAnimation: false,
    fillColor: "#ccc",
    showContent: true,
    showStroke: true,
  });

  // 更新聊天框参数
  const updateChatBubbleParam = (param: string, value: number | string | boolean) => {
    setChatBubbleParams((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  // 切换动画
  const toggleAnimation = () => {
    setChatBubbleParams((prev) => ({
      ...prev,
      enableAnimation: !prev.enableAnimation,
    }));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>SVG 路径绘制演示</Title>

      <Alert
        type="info"
        message="什么是 SVG Path？"
        description="SVG Path 是一个强大的绘图工具，可以通过一系列命令创建复杂的图形路径。包括直线、曲线、弧线等，能够实现各种图形效果。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card
          title="动态SVG曲线"
          extra={
            <Space>
              <Button
                onClick={() => {
                  onAnimate();
                }}
              >
                执行动画
              </Button>
              <Button
                onClick={() => {
                  onAnimate(true);
                }}
              >
                反向执行
              </Button>
              <Button
                onClick={() => {
                  onPause();
                }}
              >
                暂停
              </Button>
              <ModalButton />
            </Space>
          }
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* 步骤 1: 起点和第一段曲线 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="300" height="250" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="red" />
                    <stop offset="100%" stopColor="blue" />
                  </linearGradient>
                </defs>
                <path
                  ref={ref}
                  d="M 100 200 A 100 100 0 1 1 200 200"
                  stroke="url(#grad1)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={pathLength}
                />
              </svg>

              {/* <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>步骤 1: 左上曲线</Text>
                </div>
                <div>
                  <Text code>M140 20</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">移动到起点</Text>
                </div>
                <div>
                  <Text code>C73 20 20 74 20 140</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">绘制左上贝塞尔曲线</Text>
                </div>
              </div> */}
            </div>
          </Space>
        </Card>
        <Card title="自定义聊天框组件">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <ChatBubbleSvg
                width={chatBubbleParams.width}
                height={chatBubbleParams.height}
                borderRadius={chatBubbleParams.borderRadius}
                strokeWidth={chatBubbleParams.strokeWidth}
                arrowWidth={chatBubbleParams.arrowWidth}
                arrowHeight={chatBubbleParams.arrowHeight}
                enableAnimation={chatBubbleParams.enableAnimation}
                fillColor={chatBubbleParams.fillColor || "#ccc"}
                showStroke={chatBubbleParams.showStroke}
              ></ChatBubbleSvg>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <ChatBubbleSvg
                width={300}
                height={200}
                borderRadius={10}
                strokeWidth={2}
                showStroke={false}
                arrowWidth={10}
                arrowHeight={5}
                fillColor={"#ccc"}
              >
                <div style={{ textAlign: "center", width: 500, height: 300 }}>
                  <Text strong>示例内容</Text>
                  <p style={{ margin: "4px 0 0 0", whiteSpace: "nowrap" }}>
                    这是一个聊天框内容示例,这是一个聊天框内容示例,这是一个聊天框内容示例这是一个聊天框内容示例
                  </p>
                </div>
              </ChatBubbleSvg>
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ minWidth: "200px" }}>
                <Text>宽度: {chatBubbleParams.width}</Text>
                <Slider min={100} max={300} value={chatBubbleParams.width} onChange={(value) => updateChatBubbleParam("width", value)} />
              </div>

              <div style={{ minWidth: "200px" }}>
                <Text>高度: {chatBubbleParams.height}</Text>
                <Slider min={50} max={200} value={chatBubbleParams.height} onChange={(value) => updateChatBubbleParam("height", value)} />
              </div>

              <div style={{ minWidth: "200px" }}>
                <Text>圆角: {chatBubbleParams.borderRadius}</Text>
                <Slider
                  min={5}
                  max={40}
                  value={chatBubbleParams.borderRadius}
                  onChange={(value) => updateChatBubbleParam("borderRadius", value)}
                />
              </div>

              <div style={{ minWidth: "200px" }}>
                <Text>描边: {chatBubbleParams.strokeWidth}</Text>
                <Slider
                  min={1}
                  max={10}
                  value={chatBubbleParams.strokeWidth}
                  onChange={(value) => updateChatBubbleParam("strokeWidth", value)}
                />
              </div>

              <div style={{ minWidth: "200px" }}>
                <Text>箭头宽度: {chatBubbleParams.arrowWidth}</Text>
                <Slider
                  min={20}
                  max={80}
                  value={chatBubbleParams.arrowWidth}
                  onChange={(value) => updateChatBubbleParam("arrowWidth", value)}
                />
              </div>

              <div style={{ minWidth: "200px" }}>
                <Text>箭头高度: {chatBubbleParams.arrowHeight}</Text>
                <Slider
                  min={10}
                  max={50}
                  value={chatBubbleParams.arrowHeight}
                  onChange={(value) => updateChatBubbleParam("arrowHeight", value)}
                />
              </div>

              <div style={{ minWidth: "200px" }}>
                <Text>填充颜色: {chatBubbleParams.fillColor}</Text>
                <div style={{ marginTop: "8px" }}>
                  <input
                    type="color"
                    value={chatBubbleParams.fillColor}
                    onChange={(e) => updateChatBubbleParam("fillColor", e.target.value)}
                    style={{
                      width: "40px",
                      height: "30px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                    }}
                  />
                  <Input
                    value={chatBubbleParams.fillColor}
                    onChange={(e) => updateChatBubbleParam("fillColor", e.target.value)}
                    style={{ width: "100px", marginLeft: "8px" }}
                    placeholder="#cccccc"
                  />
                </div>
              </div>
            </div>

            <Space>
              <Button type={chatBubbleParams.enableAnimation ? "primary" : "default"} onClick={toggleAnimation}>
                {chatBubbleParams.enableAnimation ? "关闭动画" : "开启动画"}
              </Button>
              <Button
                type={chatBubbleParams.showContent ? "primary" : "default"}
                onClick={() => updateChatBubbleParam("showContent", !chatBubbleParams.showContent)}
              >
                {chatBubbleParams.showContent ? "隐藏内容" : "显示内容"}
              </Button>
              <Button
                type={chatBubbleParams.showStroke ? "primary" : "default"}
                onClick={() => updateChatBubbleParam("showStroke", !chatBubbleParams.showStroke)}
              >
                {chatBubbleParams.showStroke ? "关闭描边" : "开启描边"}
              </Button>
            </Space>
          </Space>
        </Card>

        <Card title="直线命令演示">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="300" height="100" viewBox="0 0 300 100">
                <path d="M20 20 L100 20 H180 V80 Z" stroke="red" fill="none" strokeWidth="2" />
                <circle cx="20" cy="20" r="4" fill="blue" />
                <circle cx="100" cy="20" r="4" fill="blue" />
                <circle cx="180" cy="20" r="4" fill="blue" />
                <circle cx="180" cy="80" r="4" fill="blue" />
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>直线绘制步骤</Text>
                </div>
                <div>
                  <Text code>M20 20</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">移动到起点 (20,20)</Text>
                </div>
                <div>
                  <Text code>L100 20</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">画直线到点 (100,20)</Text>
                </div>
                <div>
                  <Text code>H180</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">画水平线到 x=180</Text>
                </div>
                <div>
                  <Text code>V80</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">画垂直线到 y=80</Text>
                </div>
                <div>
                  <Text code>Z</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">闭合路径</Text>
                </div>
              </div>
            </div>
          </Space>
        </Card>

        <Card title="贝塞尔曲线演示">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* 二次贝塞尔曲线 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="300" height="100" viewBox="0 0 300 100">
                <path d="M20 50 Q90 10 180 50" stroke="red" fill="none" strokeWidth="2" />
                <circle cx="20" cy="50" r="4" fill="blue" />
                <circle cx="90" cy="10" r="4" fill="green" />
                <circle cx="180" cy="50" r="4" fill="blue" />
                <path d="M20 50 L90 10 L180 50" stroke="#ccc" strokeDasharray="4" fill="none" />
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>二次贝塞尔曲线</Text>
                </div>
                <div>
                  <Text code>M20 50</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">移动到起点</Text>
                </div>
                <div>
                  <Text code>Q90 10 180 50</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">绘制二次贝塞尔曲线，一个控制点(90,10)</Text>
                </div>
              </div>
            </div>

            {/* 三次贝塞尔曲线 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="300" height="100" viewBox="0 0 300 100">
                <path d="M20 50 C60 10 140 90 180 50" stroke="red" fill="none" strokeWidth="2" />
                <circle cx="20" cy="50" r="4" fill="blue" />
                <circle cx="60" cy="10" r="4" fill="green" />
                <circle cx="140" cy="90" r="4" fill="green" />
                <circle cx="180" cy="50" r="4" fill="blue" />
                <path d="M20 50 L60 10 M140 90 L180 50" stroke="#ccc" strokeDasharray="4" fill="none" />
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>三次贝塞尔曲线</Text>
                </div>
                <div>
                  <Text code>M20 50</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">移动到起点</Text>
                </div>
                <div>
                  <Text code>C60 10 140 90 180 50</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">绘制三次贝塞尔曲线，两个控制点(60,10) (140,90)</Text>
                </div>
              </div>
            </div>
          </Space>
        </Card>

        <Card title="S型贝塞尔曲线">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="300" height="100" viewBox="0 0 300 100">
                <path d="M20 50 C60 10 40 50 80 50 C120 50 100 90 180 50" stroke="red" fill="none" strokeWidth="2" />
                <circle cx="20" cy="50" r="4" fill="blue" />
                <circle cx="60" cy="10" r="4" fill="green" />
                <circle cx="40" cy="50" r="4" fill="green" />
                <circle cx="80" cy="50" r="4" fill="blue" />
                <circle cx="120" cy="50" r="4" fill="green" />
                <circle cx="100" cy="90" r="4" fill="green" />
                <circle cx="180" cy="50" r="4" fill="blue" />
                <path d="M20 50 L60 10 M40 50 L80 50 M120 50 L100 90 M100 90 L180 50" stroke="#ccc" strokeDasharray="4" fill="none" />
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>S型贝塞尔曲线</Text>
                </div>
                <div>
                  <Text code>M20 50</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">移动到起点</Text>
                </div>
                <div>
                  <Text code>C60 10 40 50 80 50</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">第一段曲线</Text>
                </div>
                <div>
                  <Text code>C120 50 100 90 180 50</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">第二段曲线</Text>
                </div>
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
                  <span style={{ color: "blue", marginRight: "8px" }}>●</span>
                  关键点
                  <span style={{ color: "green", margin: "0 8px" }}>●</span>
                  控制点
                  <span style={{ color: "red", marginLeft: "8px" }}>━</span>路径
                  <span style={{ color: "#ccc", marginLeft: "8px" }}>- -</span>
                  辅助线
                </div>
              </div>
            </div>
          </Space>
        </Card>

        <Card title="爱心贝塞尔曲线分解演示">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* 步骤 1: 起点和第一段曲线 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="200" height="200" viewBox="0 0 500 500">
                {/* 辅助线 */}
                <path d="M140 20 L73 20 M73 20 L20 74 M20 74 L20 140" stroke="#ccc" strokeDasharray="4" fill="none" />
                {/* 实际路径 */}
                <path d="M140 20C73 20 20 74 20 140" fill="none" stroke="red" strokeWidth="2" />
                {/* 关键点和控制点 */}
                <circle cx="140" cy="20" r="10" fill="blue" /> {/* 起点 */}
                <circle cx="73" cy="20" r="10" fill="green" /> {/* 控制点1 */}
                <circle cx="20" cy="74" r="10" fill="green" /> {/* 控制点2 */}
                <circle cx="20" cy="140" r="10" fill="blue" /> {/* 终点 */}
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>步骤 1: 左上曲线</Text>
                </div>
                <div>
                  <Text code>M140 20</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">移动到起点</Text>
                </div>
                <div>
                  <Text code>C73 20 20 74 20 140</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">绘制左上贝塞尔曲线</Text>
                </div>
              </div>
            </div>

            {/* 步骤 2: 左侧曲线到中心点 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="200" height="200" viewBox="0 0 500 500">
                {/* 辅助线 */}
                <path d="M20 140 L20 275 M20 275 L156 310 M156 310 L248 443" stroke="#ccc" strokeDasharray="4" fill="none" />
                {/* 前一段路径 */}
                <path d="M140 20C73 20 20 74 20 140" fill="none" stroke="#ccc" strokeWidth="2" />
                {/* 当前路径 */}
                <path d="M20 140c0 135 136 170 228 303" fill="none" stroke="red" strokeWidth="2" />
                {/* 关键点和控制点 */}
                <circle cx="20" cy="140" r="10" fill="blue" />
                <circle cx="20" cy="275" r="10" fill="green" />
                <circle cx="156" cy="310" r="10" fill="green" />
                <circle cx="248" cy="443" r="10" fill="blue" />
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>步骤 2: 左侧曲线</Text>
                </div>
                <div>
                  <Text code>c0 135 136 170 228 303</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">绘制左侧到中心点的曲线（使用相对坐标）</Text>
                </div>
              </div>
            </div>

            {/* 步骤 3: 右侧对称曲线 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="200" height="200" viewBox="0 0 500 500">
                {/* 辅助线 */}
                <path d="M248 443 L336 311 M336 311 L477 270 M477 270 L477 140" stroke="#ccc" strokeDasharray="4" fill="none" />
                {/* 前面的路径 */}
                <path d="M140 20C73 20 20 74 20 140c0 135 136 170 228 303" fill="none" stroke="#ccc" strokeWidth="2" />
                {/* 当前路径 */}
                <path d="M248 443c88-132 229-173 229-303" fill="none" stroke="red" strokeWidth="2" />
                {/* 关键点和控制点 */}
                <circle cx="248" cy="443" r="10" fill="blue" />
                <circle cx="336" cy="311" r="10" fill="green" />
                <circle cx="477" cy="270" r="10" fill="green" />
                <circle cx="477" cy="140" r="10" fill="blue" />
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>步骤 3: 右侧曲线</Text>
                </div>
                <div>
                  <Text code>88-132 229-173 229-303</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">绘制右侧对称曲线（使用相对坐标）</Text>
                </div>
              </div>
            </div>

            {/* 步骤 4: 闭合路径 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="200" height="200" viewBox="0 0 500 500">
                {/* 辅助线 */}
                <path d="M477 140 L423 20 M423 20 L357 20 M357 20 L248 89 M248 89 L140 20" stroke="#ccc" strokeDasharray="4" fill="none" />
                {/* 前面的路径 */}
                <path
                  d="M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                />
                {/* 当前路径 */}
                <path d="M477 140c0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69" fill="none" stroke="red" strokeWidth="2" />
                {/* 关键点和控制点 */}
                <circle cx="477" cy="140" r="10" fill="blue" />
                <circle cx="423" cy="20" r="10" fill="green" />
                <circle cx="357" cy="20" r="10" fill="blue" />
                <circle cx="248" cy="89" r="10" fill="blue" />
                <circle cx="140" cy="20" r="10" fill="blue" />
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>步骤 4: 完成闭合</Text>
                </div>
                <div>
                  <Text code>0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z</Text>
                  <Text style={{ margin: "0 8px" }}>→</Text>
                  <Text type="secondary">绘制上方曲线并闭合路径</Text>
                </div>
              </div>
            </div>

            {/* 最终效果 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <svg width="200" height="200" viewBox="0 0 500 500">
                <path
                  d="M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z"
                  fill="red"
                />
              </svg>

              <div
                style={{
                  padding: "12px",
                  background: "#f6f8fa",
                  borderRadius: "6px",
                  border: "1px solid #e1e4e8",
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <Text strong>最终效果</Text>
                </div>
                <div>
                  <Text type="secondary">添加红色填充，完成爱心图形绘制</Text>
                </div>
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
                  <span style={{ color: "blue", marginRight: "8px" }}>●</span>
                  关键点
                  <span style={{ color: "green", margin: "0 8px" }}>●</span>
                  控制点
                  <span style={{ color: "red", marginLeft: "8px" }}>━</span>路径
                </div>
              </div>
            </div>
          </Space>
        </Card>

        <Card title="实现说明">
          <Paragraph>
            <Text strong>SVG Path 命令特点：</Text>
          </Paragraph>
          <ul>
            <li>所有命令都有大写和小写版本：大写表示绝对坐标，小写表示相对坐标</li>
            <li>可以连续使用相同的命令，省略命令字母</li>
            <li>通过组合不同的命令可以绘制复杂的图形</li>
            <li>可以通过 stroke、fill 等属性控制样式</li>
          </ul>

          <Paragraph>
            <Text strong>常用命令：</Text>
          </Paragraph>
          <ul>
            <li>M/m - 移动画笔</li>
            <li>L/l - 画直线</li>
            <li>H/h - 画水平线</li>
            <li>V/v - 画垂直线</li>
            <li>C/c - 三次贝塞尔曲线</li>
            <li>S/s - 平滑三次贝塞尔曲线</li>
            <li>Q/q - 二次贝塞尔曲线</li>
            <li>T/t - 平滑二次贝塞尔曲线</li>
            <li>A/a - 弧线</li>
            <li>Z/z - 闭合路径</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

