import React, { useEffect, useRef } from "react";
import { Space } from "antd";
import { SvgIcon } from "@/components/SvgIcon";

const Basic: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);
  return (
    <Space size="large" ref={ref}>
      <SvgIcon icon="icon-zanwuquanxian" />
      <SvgIcon icon="icon-search" />
      <SvgIcon icon="icon-setting" />
    </Space>
  );
};

export default Basic;
