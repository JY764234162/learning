import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import { RenderError } from "../errors";

const { Text } = Typography;

const BuggyCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  // 在渲染过程中抛出错误
  if (count > 2) {
    throw new RenderError("计数器超出限制！", "BuggyCounter");
  }

  return (
    <Space>
      <Text>计数: {count}</Text>
      <Button onClick={handleClick}>增加（大于2时触发渲染错误）</Button>
    </Space>
  );
};

export default BuggyCounter;
