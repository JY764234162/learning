import { Layout as AntdLayout } from "antd";
const { Footer } = AntdLayout;

export const GlobalFooter = () => {
  return <Footer style={{ textAlign: "center" }}>前端技术学习实验室 ©{new Date().getFullYear()} Created by JiangYi</Footer>;
};
