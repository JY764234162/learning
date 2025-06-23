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
