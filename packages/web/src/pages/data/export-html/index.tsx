import {
  Button,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Menu,
  Select,
  Divider,
  Space,
  Card,
  message,
} from "antd";
import React, { useState, useRef } from "react";


export const Component = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#1677ff"); // 设置默认主题色
  const [messageApi, contextHolder] = message.useMessage();

  const exportToHtml = () => {
    try {
      if (!ref.current) return;
      // 获取所有样式表
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join("\n");
          } catch (e) {
            return "";
          }
        })
        .join("\n");

      const blob = new Blob(
        [
          `
            <!DOCTYPE html>
            <html lang="zh-CN">
              <head>
                <meta charset='UTF-8'>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>导出页面</title>
                <style>
                  ${styles}
                  .export-container {
                    padding: 24px;
                    max-width: 1200px;
                    margin: 0 auto;
                  }
                  .ant-pagination,
                  .export-button {
                    display: none !important;
                  }
                </style>
                ${document.head.innerHTML}
              </head>
              <body>
                ${ref.current?.outerHTML}
              </body>
            </html>
          `,
        ],
        { type: "text/html" }
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        document.title || "导出页面"
      }_${new Date().toLocaleDateString()}.html`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      messageApi.success("导出成功！");
    } catch (error) {
      console.error("导出错误:", error);
      messageApi.error("导出失败，请重试！");
    }
  };

  return (
    <div
      className="export-container"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}
    >
      {contextHolder}
      <Card
        title="页面导出测试"
        extra={
          <Button
            type="primary"
            onClick={exportToHtml}
            className="export-button"
          >
            导出HTML
          </Button>
        }
      >
        <div ref={ref}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: color,
                colorTextBase: color,
              },
              inherit: false,
              cssVar: true,
            }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space>
                <span>主题色选择：</span>
                <ColorPicker
                  value={color}
                  onChange={(c) => setColor(c.toHexString())}
                  showText
                />
              </Space>

              <Space wrap>
                <Button type="primary">主按钮</Button>
                <Button>次按钮</Button>
                <Select
                  placeholder="请选择"
                  style={{ width: 200 }}
                  options={[
                    { label: "选项1", value: "1" },
                    { label: "选项2", value: "2" },
                  ]}
                />
                <DatePicker placeholder="选择日期" />
              </Space>

              <Divider orientation="left" orientationMargin={50}>
                分割线示例
              </Divider>

              <Menu mode="horizontal">
                <Menu.Item key="1">菜单项 1</Menu.Item>
                <Menu.Item key="2">菜单项 2</Menu.Item>
                <Menu.Item key="3">菜单项 3</Menu.Item>
              </Menu>
            </Space>
          </ConfigProvider>
        </div>
      </Card>
    </div>
  );
}
