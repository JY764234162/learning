import React, { useState } from "react";
import { Typography, Space, Alert, Card, Select, Row, Col } from "antd";

import "./iconfont-oracle/oracle.css";

const { Title, Paragraph } = Typography;

export const Component = () => {
  const [code, setCode] = useState(0xe834);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Oracle 字体</Title>

      <Alert
        type="info"
        message="Oracle(甲骨文) 字体"
        description="Oracle 字体是一种基于古代甲骨文的字体，可以为您的应用添加独特的历史韵味。通过CSS样式，您可以控制字体的大小、颜色，甚至添加渐变等高级效果，提高界面的视觉表现力。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="基础用法">
          <Paragraph>最简单的使用方式，直接使用字体编码：</Paragraph>
          <div style={{ marginBottom: "20px" }}>
            <span
              className="oracle"
              style={{ fontSize: "32px", marginRight: "16px" }}
            >
              {String.fromCharCode(code)}
            </span>
            <span>编码: {`0x${code.toString(16)}`}</span>
          </div>
          <Select
            style={{ width: "100%" }}
            defaultValue={code}
            options={[
              { label: "e834", value: 0xe834 },
              { label: "e925", value: 0xe925 },
              { label: "e935", value: 0xe935 },
              { label: "e945", value: 0xe945 },
            ]}
            onChange={(value) => setCode(value)}
            optionRender={(option) => (
              <Space style={{ width: "100%" }}>
                <span className="oracle" aria-label={option.data.label}>
                  {String.fromCharCode(option.data.value)}
                </span>
                {`0x${option.data.value.toString(16)}`}
              </Space>
            )}
          />
        </Card>

        <Card title="字体大小">
          <Paragraph>通过 fontSize 属性可以控制字体的大小：</Paragraph>
          <Row gutter={[16, 16]}>
            <Col span={6} style={{ textAlign: "center" }}>
              <span className="oracle" style={{ fontSize: "16px" }}>
                {String.fromCharCode(0xe834)}
              </span>
              <div>16px</div>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <span className="oracle" style={{ fontSize: "24px" }}>
                {String.fromCharCode(0xe834)}
              </span>
              <div>24px</div>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <span className="oracle" style={{ fontSize: "32px" }}>
                {String.fromCharCode(0xe834)}
              </span>
              <div>32px</div>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <span className="oracle" style={{ fontSize: "48px" }}>
                {String.fromCharCode(0xe834)}
              </span>
              <div>48px</div>
            </Col>
          </Row>
        </Card>

        <Card title="字体颜色">
          <Paragraph>通过 color 属性可以设置字体颜色：</Paragraph>
          <Row gutter={[16, 16]}>
            <Col span={6} style={{ textAlign: "center" }}>
              <span
                className="oracle"
                style={{ fontSize: "32px", color: "#1890ff" }}
              >
                {String.fromCharCode(0xe834)}
              </span>
              <div>蓝色</div>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <span
                className="oracle"
                style={{ fontSize: "32px", color: "#52c41a" }}
              >
                {String.fromCharCode(0xe834)}
              </span>
              <div>绿色</div>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <span
                className="oracle"
                style={{ fontSize: "32px", color: "#faad14" }}
              >
                {String.fromCharCode(0xe834)}
              </span>
              <div>黄色</div>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <span
                className="oracle"
                style={{ fontSize: "32px", color: "#f5222d" }}
              >
                {String.fromCharCode(0xe834)}
              </span>
              <div>红色</div>
            </Col>
          </Row>
        </Card>

        <Card title="全局渐变">
          <Paragraph>使用CSS渐变效果直接应用于文字：</Paragraph>
          <Row gutter={[16, 16]}>
            <Col span={8} style={{ textAlign: "center" }}>
              <span
                className="oracle"
                style={{
                  fontSize: "48px",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(to right, #f5222d, #faad14, #52c41a)",
                }}
              >
                {String.fromCharCode(0xe834)}
              </span>
              <div>渐变效果 A</div>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <span
                className="oracle"
                style={{
                  fontSize: "48px",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(to bottom, #1890ff, #722ed1)",
                }}
              >
                {String.fromCharCode(0xe925)}
              </span>
              <div>渐变效果 B</div>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <span
                className="oracle"
                style={{
                  fontSize: "48px",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundImage: "radial-gradient(circle, #faad14, #f5222d)",
                }}
              >
                {String.fromCharCode(0xe935)}
              </span>
              <div>渐变效果 C</div>
            </Col>
          </Row>
        </Card>
      </Space>
    </div>
  );
};

