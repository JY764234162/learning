import React from "react";
import { Space } from "antd";
import { SvgIcon } from "@/components/SvgIcon";

const Gradient: React.FC = () => {
  return (
    <Space size="large">
      <SvgIcon
        icon="icon-zanwuquanxian"
        size={32}
        resourceDefs={
          <defs>
            <linearGradient id="grad1" gradientTransform="rotate(123)">
              <stop offset="-5%" stopColor="#CE2BFF" />
              <stop offset="51%" stopColor="#0C90E4" />
              <stop offset="100%" stopColor="#2BDBF6" />
            </linearGradient>
          </defs>
        }
        style={{ fill: "url(#grad1)" }}
      />

      <SvgIcon
        icon="icon-zanwuquanxian"
        size={32}
        resourceDefs={
          <defs>
            <linearGradient id="grad2" gradientTransform="rotate(45)">
              <stop offset="0%" stopColor="#f5222d" />
              <stop offset="100%" stopColor="#fa8c16" />
            </linearGradient>
          </defs>
        }
        style={{ fill: "url(#grad2)" }}
      />
    </Space>
  );
};

export default Gradient;
