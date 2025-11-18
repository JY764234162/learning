import React, { useEffect } from "react";
import { Space, Button } from "antd";
import { SvgIcon } from "@/components/SvgIcon";

const Custom: React.FC = () => {
  return (
    <Space size="large">
      <Button
        type="link"
        style={{
          display: "flex",
          alignItems: "center",
          fill: "url(#globalGradient)",
        }}
        icon={<SvgIcon icon="icon-yuyan" />}
      >
        收藏
      </Button>
      <Button
        type="primary"
        style={{
          display: "flex",
          alignItems: "center",
          fill: "#url(#globalGradient)",
        }}
        icon={<SvgIcon icon="icon-time" style={{ marginRight: 8 }} />}
      >
        设置
      </Button>
    </Space>
  );
};

export default Custom;
