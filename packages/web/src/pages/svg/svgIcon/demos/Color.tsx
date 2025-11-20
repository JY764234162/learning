import React from "react";
import { Space } from "antd";
import { SvgIcon } from "@/components/SvgIcon";

const Color: React.FC = () => {
  return (
    <Space size="large">
      <SvgIcon
        icon="icon-zanwuquanxian"
        size={24}
        style={{ fill: "#1677ff" }}
      />
      <SvgIcon
        icon="icon-zanwuquanxian"
        size={24}
        style={{ fill: "#52c41a" }}
      />
      <SvgIcon
        icon="icon-zanwuquanxian"
        size={24}
        style={{ fill: "#f5222d" }}
      />
    </Space>
  );
};

export default Color;
