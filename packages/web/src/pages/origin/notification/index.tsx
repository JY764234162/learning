import React, { useState, useEffect } from "react";
import { Button, Input, Form, Select, Space, Card, Typography, Alert, Divider } from "antd";
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export const Component = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | "default">("default");
  const [form] = Form.useForm();

  // 检查当前的通知权限状态
  useEffect(() => {
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  // 请求通知权限
  const requestPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
    }
  };

  // 发送通知
  const sendNotification = (values: any) => {
    if ("Notification" in window && permissionStatus === "granted") {
      const notificationOptions: NotificationOptions = {
        body: values.body,
        icon: values.icon || "https://jy764234162.github.io/learning/favicon.svg",
        dir: values.dir || "auto",
        silent: values.silent,
      };

      const notification = new Notification(values.title, notificationOptions);

      // 添加事件监听
      notification.onclick = () => {
        console.log("通知被点击了");
        window.focus();
      };

      notification.onclose = () => {
        console.log("通知被关闭了");
      };

      notification.onerror = (err) => {
        console.error("通知出错:", err);
      };
    }
  };

  // 根据权限状态显示不同的提示信息
  const renderPermissionAlert = () => {
    switch (permissionStatus) {
      case "granted":
        return <Alert type="success" message="已获得通知权限，可以发送通知" showIcon />;
      case "denied":
        return <Alert type="error" message="通知权限已被拒绝" description="请在浏览器设置中修改通知权限设置" showIcon />;
      default:
        return <Alert type="info" message="尚未请求通知权限" description="点击下方按钮请求权限" showIcon />;
    }
  };

  // 判断浏览器是否支持通知API
  const isNotificationSupported = "Notification" in window;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>浏览器通知功能演示</Title>

      {!isNotificationSupported ? (
        <Alert type="warning" message="您的浏览器不支持通知功能" description="请尝试使用Chrome、Firefox、Safari等现代浏览器" showIcon />
      ) : (
        <>
          {renderPermissionAlert()}
          <Divider />

          <Space direction="vertical" style={{ width: "100%" }}>
            {permissionStatus !== "granted" && (
              <Button type="primary" onClick={requestPermission} disabled={permissionStatus === "denied"}>
                请求通知权限
              </Button>
            )}

            {permissionStatus === "granted" && (
              <Card title="发送自定义通知">
                <Form
                  form={form}
                  onFinish={sendNotification}
                  initialValues={{
                    title: "通知标题",
                    body: "这是通知的内容，可以包含详细信息",
                    icon: "https://jy764234162.github.io/learning/favicon.svg",
                    dir: "auto",
                    silent: false,
                  }}
                  layout="vertical"
                >
                  <Form.Item name="title" label="标题" rules={[{ required: true }]}>
                    <Input placeholder="请输入通知标题" />
                  </Form.Item>

                  <Form.Item name="body" label="内容" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="请输入通知内容" />
                  </Form.Item>

                  <Form.Item name="icon" label="图标URL">
                    <Input placeholder="请输入图标URL" />
                  </Form.Item>

                  <Form.Item name="dir" label="文字方向">
                    <Select>
                      <Option value="auto">自动</Option>
                      <Option value="ltr">从左到右</Option>
                      <Option value="rtl">从右到左</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="silent" label="静音模式">
                    <Select>
                      <Option value={true}>启用</Option>
                      <Option value={false}>禁用</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      发送通知
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}
          </Space>

          <Divider />

          <Card title="通知API使用说明">
            <Paragraph>
              <Text strong>Notification API</Text> 允许网页应用程序在用户不与网页交互时发送通知。
            </Paragraph>

            <Title level={4}>基本使用方法：</Title>
            <Paragraph>
              <ol>
                <li>
                  检查浏览器是否支持：
                  <Text code>{`if ("Notification" in window) {...}`}</Text>
                </li>
                <li>
                  请求权限：
                  <Text code>{`Notification.requestPermission().then(permission => {...})`}</Text>
                </li>
                <li>
                  发送通知：
                  <Text code>{`new Notification("标题", {body: "内容"})`}</Text>
                </li>
              </ol>
            </Paragraph>

            <Title level={4}>注意事项：</Title>
            <Paragraph>
              <ul>
                <li>必须先获取用户授权才能发送通知</li>
                <li>应当避免过多发送通知造成骚扰</li>
                <li>在不同的设备和操作系统上，通知的外观会有所不同</li>
                <li>部分参数在某些平台上可能不被支持</li>
              </ul>
            </Paragraph>
          </Card>
        </>
      )}
    </div>
  );
};
