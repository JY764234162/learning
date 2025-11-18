import React from "react";
import { Space } from "antd";
import { SvgIcon } from "@/components/SvgIcon";

const GlobalGradient: React.FC = () => {
  return (
    <Space>
      <div style={{ textAlign: "center" }}>
        <SvgIcon
          icon="icon-yinpin"
          size={32}
          style={{ fill: "url(#globalGradient)" }}
        />
        <div>点赞</div>
      </div>

      <div style={{ textAlign: "center" }}>
        <SvgIcon
          icon="icon-a-jiqiren1"
          size={32}
          style={{ fill: "url(#globalGradient)" }}
        />
        <div>收藏</div>
      </div>

      <div style={{ textAlign: "center" }}>
        <SvgIcon
          icon="icon-team"
          size={32}
          style={{ fill: "url(#globalGradient)" }}
        />
        <div>设置</div>
      </div>
    </Space>
  );
};

export default GlobalGradient;
