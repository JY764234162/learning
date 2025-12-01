import { Alert, Card, Space, Typography, Upload } from "antd";
import React from "react";
import ModalButton from "./modalButton";

const { Title } = Typography;
export const Component = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>自适应高度弹窗</Title>

      <Alert
        type="info"
        message="什么是自适应高度弹窗？"
        description="自适应弹窗，弹窗后调整窗口高度，可以看到弹窗的高度自适应变化，最小高度600px"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="点击弹窗">
          <Space direction="vertical" style={{ width: "100%" }}>
            <ModalButton />
          </Space>
        </Card>
      </Space>
    </div>
  );
};
