import React from "react";
import { Flex } from "antd";
import { SvgIcon } from "@/components/SvgIcon";

const Size: React.FC = () => {
  return (
    <Flex gap="large" align="end">
      <SvgIcon icon="icon-zanwuquanxian" size={16} />
      <SvgIcon icon="icon-zanwuquanxian" size={32} />
      <SvgIcon icon="icon-zanwuquanxian" size={64} />
    </Flex>
  );
};

export default Size;
