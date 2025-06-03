import React, { useState, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Alert,
  Typography,
  Tooltip,
  Table,
  Select,
} from "antd";
import {
  ClockCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  usePerformanceStore,
  PerformanceMetric,
} from "@/stores/performanceStore";
import styles from "./index.module.less";

const { Option } = Select;

const metricDescriptions = {
  FCP: "首次内容绘制 - 页面首次渲染任何文本、图像、非空白 canvas 或 SVG 的时间",
  LCP: "最大内容绘制 - 页面最大的内容元素渲染完成的时间",
  DOMContentLoaded: "DOM加载完成 - HTML文档被完全加载和解析完成的时间",
  Load: "页面完全加载 - 页面所有资源加载完成的时间",
  ResourceCount: "资源总数 - 页面加载过程中请求的所有资源文件数量",
  ResourceSize: "资源总大小 - 所有资源文件的总大小",
  ResourceLoadTime: "资源加载时间 - 所有资源完全加载完成的时间",
  ScriptExecutionTime: "脚本执行时间 - JavaScript 代码执行所需的总时间",
};

export default function PerformanceMonitor() {
  const metrics = usePerformanceStore((state) => state.metrics);
  const [selectedPage, setSelectedPage] = useState<string>("all");

  const pages = useMemo(() => {
    const uniquePages = Array.from(new Set(metrics.map((m) => m.pageUrl)));
    return ["all", ...uniquePages];
  }, [metrics]);

  // 按页面和指标分组，只保留最新的数据
  const groupedMetrics = useMemo(() => {
    const grouped = metrics.reduce((acc, metric) => {
      const key = `${metric.pageUrl}-${metric.name}`;
      if (!acc[key] || acc[key].timestamp < metric.timestamp) {
        acc[key] = metric;
      }
      return acc;
    }, {} as Record<string, PerformanceMetric>);

    return Object.values(grouped);
  }, [metrics]);

  // 根据选择的页面过滤数据
  const filteredMetrics = useMemo(() => {
    if (selectedPage === "all") return groupedMetrics;
    return groupedMetrics.filter((m) => m.pageUrl === selectedPage);
  }, [groupedMetrics, selectedPage]);

  // 获取要在卡片中显示的指标（每个指标的最新值）
  const latestMetrics = useMemo(() => {
    return filteredMetrics.reduce((acc, metric) => {
      if (!acc[metric.name] || acc[metric.name].timestamp < metric.timestamp) {
        acc[metric.name] = metric;
      }
      return acc;
    }, {} as Record<string, PerformanceMetric>);
  }, [filteredMetrics]);

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case "good":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "needs-improvement":
        return <WarningOutlined style={{ color: "#faad14" }} />;
      case "poor":
        return <ClockCircleOutlined style={{ color: "#f5222d" }} />;
      default:
        return <LoadingOutlined />;
    }
  };

  const columns = [
    {
      title: "页面",
      dataIndex: "pageUrl",
      key: "pageUrl",
      width: 150,
    },
    {
      title: "指标",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "描述",
      dataIndex: "name",
      key: "description",
      render: (name: string) => (
        <Tooltip
          title={metricDescriptions[name as keyof typeof metricDescriptions]}
        >
          <span className={styles.descriptionCell}>
            {(() => {
              switch (name) {
                case "FCP":
                  return "首次内容绘制时间，表示页面首次显示内容的时间点";
                case "LCP":
                  return "最大内容绘制时间，表示页面主要内容显示的时间点";
                case "DOMContentLoaded":
                  return "DOM加载完成时间，表示HTML文档结构加载解析完成的时间";
                case "Load":
                  return "页面完全加载时间，包含所有资源加载完成的时间";
                case "ResourceCount":
                  return "页面加载的资源文件总数";
                case "ResourceSize":
                  return "页面加载的资源文件总大小";
                case "ResourceLoadTime":
                  return "所有资源加载完成所需时间";
                case "ScriptExecutionTime":
                  return "JavaScript脚本执行总时间";
                default:
                  return "未知指标";
              }
            })()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "值",
      dataIndex: "value",
      key: "value",
      render: (value: number | string, record: PerformanceMetric) => (
        <span className={styles[`value-${record.rating}`]}>
          {typeof value === "number" && record.name !== "ResourceCount"
            ? `${value.toFixed(2)}${record.unit || "ms"}`
            : value}
        </span>
      ),
    },
    {
      title: "状态",
      dataIndex: "rating",
      key: "rating",
      width: 80,
      render: (rating: string) => (
        <Tooltip title={getRatingText(rating)}>{getRatingIcon(rating)}</Tooltip>
      ),
    },
    {
      title: "时间",
      dataIndex: "timestamp",
      key: "timestamp",
      width: 180,
      render: (timestamp: number) => new Date(timestamp).toLocaleString(),
    },
  ];

  // 添加状态说明文本的辅助函数
  const getRatingText = (rating: string): string => {
    switch (rating) {
      case "good":
        return "性能良好";
      case "needs-improvement":
        return "需要改进";
      case "poor":
        return "性能较差";
      default:
        return "未知状态";
    }
  };

  return (
    <div className={styles.container}>
      <Card title="页面性能监控面板">
        <Alert
          message="性能指标说明"
          description="这些指标反映了页面的加载性能和交互性能。绿色表示良好，黄色表示需要改进，红色表示性能较差。"
          type="info"
          showIcon
          className={styles.alert}
        />

        <div className={styles.filterSection}>
          <Select
            value={selectedPage}
            onChange={setSelectedPage}
            style={{ width: 200, marginBottom: 16 }}
          >
            {pages.map((page) => (
              <Option key={page} value={page}>
                {page === "all" ? "所有页面" : page}
              </Option>
            ))}
          </Select>
        </div>

        <Row gutter={[16, 16]} className={styles.metricsContainer}>
          {Object.values(latestMetrics).map((metric) => (
            <Col xs={24} sm={12} md={8} key={metric.name}>
              <Card className={styles.metricCard}>
                <Tooltip
                  title={
                    metricDescriptions[
                      metric.name as keyof typeof metricDescriptions
                    ]
                  }
                >
                  <Statistic
                    title={
                      <span>
                        {metric.name} {getRatingIcon(metric.rating)}
                      </span>
                    }
                    value={metric.value}
                    precision={metric.name === "CLS" ? 3 : 2}
                    suffix={metric.name === "CLS" ? "" : "ms"}
                    className={styles[`metric-${metric.rating}`]}
                  />
                </Tooltip>
              </Card>
            </Col>
          ))}
        </Row>

        <Card title="性能指标记录" className={styles.historyCard}>
          <Table
            dataSource={filteredMetrics}
            columns={columns}
            rowKey={(record) => `${record.pageUrl}-${record.name}`}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Card>
    </div>
  );
}
