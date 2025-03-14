import React from "react";
import { Space } from "antd";
import { SvgIcon } from "../components/SvgIcon";

const Basic: React.FC = () => {
  return (
    <Space size="large">
      <SvgIcon icon="icon-zanwuquanxian" />
      <SvgIcon icon="icon-search" />
      <SvgIcon icon="icon-setting" />
    </Space>
  );
};

export default Basic;
