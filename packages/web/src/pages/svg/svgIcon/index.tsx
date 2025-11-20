import React, { useEffect } from "react";
import { Typography, Space, Alert, Card } from "antd";
import Basic from "./demos/Basic";
import Size from "./demos/Size";
import Color from "./demos/Color";
import Gradient from "./demos/Gradient";
import GlobalGradient from "./demos/GlobalGradient";
import Custom from "./demos/Custom";
import "./assets/iconfont";
const { Title, Paragraph } = Typography;

export const Component = () => {

  useEffect(()=>{
    
  })
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>SvgIcon 图标</Title>

      <Alert
        type="info"
        message="什么是 SvgIcon？"
        description="SvgIcon 是一种基于 SVG 的图标组件，它允许开发者轻松使用和自定义图标。通过该组件，你可以控制图标的大小、颜色，甚至添加渐变等高级效果，提高界面的视觉表现力。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="基础用法">
          <Paragraph>最简单的使用方式，直接指定图标名称：</Paragraph>
          <Basic />
        </Card>

        <Card title="图标大小">
          <Paragraph>通过 size 属性可以控制图标的大小：</Paragraph>
          <Size />
        </Card>

        <Card title="图标颜色">
          <Paragraph>通过 style 属性中的 fill 可以设置图标颜色：</Paragraph>
          <Color />
        </Card>

        <Card title="渐变效果">
          <Paragraph>通过 resourceDefs 可以添加 SVG 渐变效果：</Paragraph>
          <Gradient />
        </Card>

        <Card title="全局渐变">
          <Paragraph>使用全局定义的渐变效果（在index.html中定义）：</Paragraph>
          <GlobalGradient />
          <pre
            style={{
              background: "rgb(246, 248, 250)",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            {`<body>
  <!-- 全局定义svg渐变 -->
  <svg style="position: absolute; width: 0px; height: 0px; overflow: hidden">
    <defs>
      <linearGradient id="globalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop
          offset="0%"
          style="stop-color: rgb(255, 255, 0); stop-opacity: 1"
        />
        <stop
          offset="100%"
          style="stop-color: rgb(255, 0, 0); stop-opacity: 1"
        />
      </linearGradient>
    </defs>
  </svg>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>`}
          </pre>
        </Card>

        <Card title="与按钮组合">
          <Paragraph>
            图标可以与按钮或其他组件组合使用，增强交互体验：
          </Paragraph>
          <Custom />
        </Card>
      </Space>
    </div>
  );
};

