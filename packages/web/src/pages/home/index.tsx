import React from "react";
import { Card, Row, Col, Typography, Space, Tag, Divider } from "antd";
import {
  AppstoreOutlined,
  InteractionOutlined,
  FileTextOutlined,
  CodeOutlined,
  ToolOutlined,
  ApiOutlined,
  EditOutlined,
  BulbOutlined,
  ExperimentOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import styles from "./index.module.less";

const { Title, Paragraph, Text } = Typography;

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path?: string;
  tags?: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, path, tags }) => {
  const navigate = useNavigate();
  const settings = useSelector(settingSlice.selectors.getSettings);
  const primary = settings.color.primary;

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <Card
      hoverable={!!path}
      onClick={handleClick}
      className={styles.featureCard}
      bodyStyle={{ height: "100%" }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div className={styles.iconWrapper} style={{ color: primary }}>
          {icon}
        </div>
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        <Paragraph style={{ margin: 0, color: "#666" }}>{description}</Paragraph>
        {tags && tags.length > 0 && (
          <Space wrap>
            {tags.map((tag) => (
              <Tag key={tag} color={primary}>
                {tag}
              </Tag>
            ))}
          </Space>
        )}
      </Space>
    </Card>
  );
};

export const Component = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const primary = settings.color.primary;

  const features: FeatureCardProps[] = [
    {
      icon: <AppstoreOutlined />,
      title: "UI组件",
      description: "丰富的UI组件示例，包括贝塞尔曲线Tabs、自适应高度弹窗、Tree编辑器、Cron计时器等",
      path: "/ui",
      tags: ["组件", "UI", "交互"],
    },
    {
      icon: <InteractionOutlined />,
      title: "交互功能",
      description: "拖拽上传、拖拽排序、拖拽列表、滚动高亮、关键字高亮等交互功能实现",
      path: "/interaction",
      tags: ["拖拽", "滚动", "交互"],
    },
    {
      icon: <FileTextOutlined />,
      title: "图像处理",
      description: "Canvas像素化、图像颜色分析、图片水印、懒加载、渐进式加载等图像处理技术",
      path: "/image",
      tags: ["Canvas", "图像", "性能"],
    },
    {
      icon: <CodeOutlined />,
      title: "数据处理",
      description: "XML解析、字符串差异对比、HTML导出等数据处理功能",
      path: "/data",
      tags: ["解析", "对比", "导出"],
    },
    {
      icon: <EditOutlined />,
      title: "编辑器",
      description: "Monaco编辑器集成、富文本编辑器实现，支持代码高亮、diff对比等功能",
      path: "/editor",
      tags: ["Monaco", "富文本", "编辑"],
    },
    {
      icon: <FileTextOutlined />,
      title: "文档预览",
      description: "Word文档预览、PDF文档预览，支持文件上传和在线预览",
      path: "/doc",
      tags: ["Word", "PDF", "预览"],
    },
    {
      icon: <ApiOutlined />,
      title: "可视化",
      description: "React Flow流程图、Three.js 3D展示、Leaflet地图等可视化技术",
      path: "/visualization",
      tags: ["流程图", "3D", "地图"],
    },
    {
      icon: <ToolOutlined />,
      title: "工具库",
      description: "Floating UI浮动定位、WebSocket实时通信、状态管理等实用工具",
      path: "/tools",
      tags: ["工具", "通信", "状态"],
    },
    {
      icon: <ExperimentOutlined />,
      title: "React特性",
      description: "Error Boundary、Suspense、Strict Mode、useSyncExternalStore等React特性示例",
      path: "/react",
      tags: ["React", "特性", "实践"],
    },
    {
      icon: <BulbOutlined />,
      title: "样式技巧",
      description: "CSS Filter滤镜、甲骨文字体、SVG图标等CSS样式技巧",
      path: "/styles",
      tags: ["CSS", "SVG", "样式"],
    },
    {
      icon: <RocketOutlined />,
      title: "开发工具",
      description: "Vite HMR、微前端MicroApp等开发工具和技术实践",
      path: "/dev-tools",
      tags: ["Vite", "微前端", "工具"],
    },
  ];

  const techStack = [
    "React 18",
    "TypeScript",
    "Ant Design",
    "Vite",
    "React Router",
    "Redux Toolkit",
    "Monaco Editor",
    "Three.js",
    "PDF.js",
    "React Flow",
    "Leaflet",
    "Canvas API",
  ];

  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <Space direction="vertical" size="large" style={{ width: "100%", textAlign: "center" }}>
          <Title level={1} style={{ margin: 0, fontSize: "3rem" }}>
            前端学习示例项目
          </Title>
          <Paragraph style={{ fontSize: "1.2rem", color: "#666", margin: 0 }}>
            一个集成了各种前端技术栈的学习与实践项目
          </Paragraph>
          <Space wrap size="middle">
            {techStack.slice(0, 6).map((tech) => (
              <Tag key={tech} color={primary} style={{ fontSize: "14px", padding: "4px 12px" }}>
                {tech}
              </Tag>
            ))}
          </Space>
        </Space>
      </div>

      <Divider />

      <div className={styles.content}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
          核心功能模块
        </Title>

        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={index}>
              <FeatureCard {...feature} />
            </Col>
          ))}
        </Row>

        <Divider />

        <Card className={styles.introCard}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={3}>项目介绍</Title>
            <Paragraph>
              这是一个前端学习与实践项目，涵盖了现代前端开发的各个方面。通过实际案例展示了
              <Text strong> React </Text>、
              <Text strong> TypeScript </Text>、
              <Text strong> Ant Design </Text>
              等技术栈的使用方法和最佳实践。
            </Paragraph>
            <Paragraph>
              项目包含了从基础的 UI 组件到复杂的交互功能，从图像处理到数据可视化，从编辑器实现到文档预览等多个实用模块。每个模块都经过精心设计和实现，注重代码质量和用户体验。
            </Paragraph>

            <Title level={4}>技术特点</Title>
            <ul>
              <li>
                <Text strong>组件化开发：</Text>使用 React 18 + TypeScript 构建可复用的组件
              </li>
              <li>
                <Text strong>现代化工具链：</Text>采用 Vite 作为构建工具，提供极速的开发体验
              </li>
              <li>
                <Text strong>状态管理：</Text>集成 Redux Toolkit、Zustand、Jotai 等多种状态管理方案
              </li>
              <li>
                <Text strong>UI 框架：</Text>基于 Ant Design 构建美观一致的用户界面
              </li>
              <li>
                <Text strong>代码规范：</Text>使用 ESLint、Prettier 确保代码质量
              </li>
              <li>
                <Text strong>类型安全：</Text>完整的 TypeScript 类型定义，提供更好的开发体验
              </li>
            </ul>

            <Title level={4}>适用场景</Title>
            <Paragraph>
              本项目适合作为前端学习参考、技术选型验证、代码片段复用等场景。无论你是初学者想要了解现代前端开发，还是经验丰富的开发者寻找特定功能的实现方案，都能在这里找到有价值的内容。
            </Paragraph>
          </Space>
        </Card>
      </div>
    </div>
  );
};

