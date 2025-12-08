import { Layout as AntdLayout } from "antd";
const { Footer } = AntdLayout;

export const GlobalFooter = () => {
  return (
    <Footer style={{ textAlign: "center", boxShadow: "0 1px 2px rgb(0, 21, 41, 0.08)" }}>
      前端技术学习实验室 ©{new Date().getFullYear()} Created by JiangYi
    </Footer>
  );
};
