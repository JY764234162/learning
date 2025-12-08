import { Layout as AntdLayout } from "antd";
import { memo } from "react";
const { Footer } = AntdLayout;

export const GlobalFooter = memo(() => {
  return (
    <Footer style={{ textAlign: "center", boxShadow: "0 1px 2px rgb(0, 21, 41, 0.08)" }}>
      前端技术学习实验室 ©{new Date().getFullYear()} Created by JiangYi
    </Footer>
  );
});
