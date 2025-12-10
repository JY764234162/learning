import React, { useState } from "react";
import { diffWords, Change } from "diff";
import { Typography, Card, Alert, Space, Input, theme } from "antd";
import "./style.css";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export const Component = () => {
  const { token } = theme.useToken();
  const [textOne, setTextOne] = useState("beep boop");
  const [textTwo, setTextTwo] = useState("beep boob blah");

  const diffResult = diffWords(textOne, textTwo);
  console.log(diffResult);
  const renderDiff = (diffData: Change[]) => {
    return diffData.map((part, index) => {
      const color = part.added
        ? token.colorSuccess
        : part.removed
          ? token.colorError
          : "inherit";
      const backgroundColor = part.added
        ? token.colorSuccessBg
        : part.removed
          ? token.colorErrorBg
          : "transparent";

      return (
        <span
          key={index}
          style={{
            color,
            backgroundColor,
            padding: "0 4px",
            margin: "0 2px",
            borderRadius: "2px",
          }}
        >
          {part.value}
        </span>
      );
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>字符串差异对比</Title>

      <Alert
        type="info"
        message="什么是字符串差异对比？"
        description="字符串差异对比是一种用于比较两段文本之间差异的工具。它能够精确地显示出文本中添加、删除或保持不变的部分，广泛应用于代码审查、文档版本控制等场景。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="输入区域">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Text strong>文本 1：</Text>
              <TextArea
                value={textOne}
                onChange={(e) => setTextOne(e.target.value)}
                rows={3}
                placeholder="请输入第一段文本"
              />
            </div>
            <div>
              <Text strong>文本 2：</Text>
              <TextArea
                value={textTwo}
                onChange={(e) => setTextTwo(e.target.value)}
                rows={3}
                placeholder="请输入第二段文本"
              />
            </div>
          </Space>
        </Card>

        <Card title="对比结果">
          <div className="diff-result">{renderDiff(diffResult)}</div>
        </Card>

        <Card title="功能说明">
          <Paragraph>
            <Text strong>实现原理：</Text>
          </Paragraph>
          <ul>
            <li>使用 diff 库进行文本差异分析</li>
            <li>支持单词级别的差异对比</li>
            <li>通过颜色标注展示修改内容</li>
            <li>实时动态对比更新</li>
          </ul>

          <Paragraph>
            <Text strong>颜色说明：</Text>
          </Paragraph>
          <ul>
            <li>
              <Text
                style={{
                  backgroundColor: token.colorSuccessBg,
                  color: token.colorSuccess,
                }}
              >
                绿色背景：新增内容
              </Text>
            </li>
            <li>
              <Text
                style={{
                  backgroundColor: token.colorErrorBg,
                  color: token.colorError,
                }}
              >
                红色背景：删除内容
              </Text>
            </li>
            <li>
              <Text>无背景：相同内容</Text>
            </li>
          </ul>

          <Paragraph>
            <Text strong>应用场景：</Text>
          </Paragraph>
          <ul>
            <li>文本版本对比</li>
            <li>代码审查工具</li>
            <li>文档修改追踪</li>
            <li>内容校对工具</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
}
