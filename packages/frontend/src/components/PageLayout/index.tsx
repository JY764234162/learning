// packages/frontend/src/components/PageLayout/index.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Button, Typography, Space, Breadcrumb, Flex } from "antd";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import styles from "./index.module.less";

const { Content } = Layout;
const { Title } = Typography;

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  extra?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  showBackButton = true,
  extra,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 获取当前路由名称
  const currentRoute = location.pathname.slice(1) || "home";

  // 格式化路由名称为标题
  const formatRouteToTitle = (route: string) => {
    return route
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Flex justify="end">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
          >
            返回首页
          </Button>
        </Flex>

        <div className={styles.main}>{children}</div>
      </Content>
    </Layout>
  );
};

export default PageLayout;
