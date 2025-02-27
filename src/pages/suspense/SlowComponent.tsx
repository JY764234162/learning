import React from "react";
import { Typography, Card } from "antd";

const { Text } = Typography;

const SlowComponent = () => {
  return (
    <Card style={{ background: "#f6f8fa" }}>
      <Text>
        这是一个模拟加载较慢的组件，通过 lazy 和 Suspense 实现了延迟加载。
        你可以看到在加载过程中显示了 loading
        状态，加载完成后平滑过渡到实际内容。
      </Text>
    </Card>
  );
};

export default SlowComponent;
