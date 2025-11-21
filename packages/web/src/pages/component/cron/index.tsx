import React from "react";
import { Typography, Card, Alert, Space, Form, Button } from "antd";
import Cron from "./Cron";

const { Title, Paragraph, Text } = Typography;

export const Component = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Cron 表达式生成器</Title>

      <Alert
        type="info"
        message="什么是 Cron 表达式？"
        description="Cron 表达式是一个字符串，包含 6 或 7 个字段，用空格分隔。每个字段代表一个时间单位，按顺序分别是：秒、分、时、日、月、周、年（可选）。通过这些字段的组合，可以定义任务的执行时间。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="演示效果">
          <Form
            form={form}
            onFinish={(values) => {
              console.log(values);
            }}
          >
            <Form.Item label="Cron 表达式" name="cron" initialValue="0 0 0 * * ? *">
              <Cron />
            </Form.Item>
            <Button htmlType="submit">结果打印控制台</Button>
          </Form>
        </Card>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>字段说明：</Text>
          </Paragraph>
          <ul>
            <li>秒：0-59</li>
            <li>分：0-59</li>
            <li>时：0-23</li>
            <li>日：1-31</li>
            <li>月：1-12</li>
            <li>周：SUN-SAT</li>
            <li>年：可选，例如：2023-2099</li>
          </ul>

          <Paragraph>
            <Text strong>常用示例：</Text>
          </Paragraph>
          <ul>
            <li>每天凌晨执行：0 0 0 * * ?</li>
            <li>每周一执行：0 0 0 ? * MON</li>
            <li>每月1号执行：0 0 0 1 * ?</li>
            <li>每隔5分钟执行：0 */5 * * * ?</li>
          </ul>

          <Paragraph>
            <Text strong>特殊字符说明：</Text>
          </Paragraph>
          <ul>
            <li>* ：表示所有值</li>
            <li>? ：表示不指定值</li>
            <li>- ：表示区间</li>
            <li>/ ：表示递增</li>
            <li>, ：表示多个值</li>
            <li>L ：表示最后</li>
            <li>W ：表示工作日</li>
            <li># ：表示第几个星期几</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};
