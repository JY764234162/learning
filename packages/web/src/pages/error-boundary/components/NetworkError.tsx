import React, { useState, useEffect } from "react";
import { Button, Space, Typography } from "antd";
import { NetworkError } from "../errors";

const { Text } = Typography;

const NetworkErrorDemo = () => {
  const [loading, setLoading] = useState(false);
  const [shouldError, setShouldError] = useState(false);

  // 在 useEffect 中抛出错误
  useEffect(() => {
    if (shouldError) {
      throw new NetworkError("服务器无响应", 503, "SERVICE_UNAVAILABLE");
    }
  }, [shouldError]);

  const handleClick = () => {
    setLoading(true);
    setShouldError(true);
  };

  return (
    <Space>
      <Text>网络请求示例</Text>
      <Button onClick={handleClick} loading={loading}>
        发起请求（将会失败）
      </Button>
    </Space>
  );
};

export default NetworkErrorDemo;
