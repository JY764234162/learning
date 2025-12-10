import React, { useState, useEffect } from "react";
import { Button, Space, Typography, Spin } from "antd";
import { AsyncOperationError } from "../errors";

const { Text } = Typography;

const AsyncError = () => {
  const [loading, setLoading] = useState(false);
  const [shouldError, setShouldError] = useState(false);

  // 在 useEffect 中抛出错误，这会在渲染过程中被捕获
  useEffect(() => {
    if (shouldError) {
      throw new AsyncOperationError("数据加载超时", "timeout");
    }
  }, [shouldError]);

  const handleClick = () => {
    setLoading(true);
    setShouldError(true);
  };

  if (loading) return <Spin />;

  return (
    <Space>
      <Text>{"未执行"}</Text>
      <Button onClick={handleClick}>执行异步操作（将会失败）</Button>
    </Space>
  );
};

export default AsyncError;
