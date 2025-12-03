import React from 'react';
import { PlayCircleOutlined, StopOutlined, BranchesOutlined, DatabaseOutlined, UserOutlined } from '@ant-design/icons';

export interface NodeTypeConfig {
  label: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
}

export const nodeTypes: Record<string, NodeTypeConfig> = {
  start: {
    label: '开始节点',
    icon: <PlayCircleOutlined style={{ color: '#52c41a' }} />,
    color: '#f6ffed',
    borderColor: '#b7eb8f',
  },
  end: {
    label: '结束节点',
    icon: <StopOutlined style={{ color: '#f5222d' }} />,
    color: '#fff2f0',
    borderColor: '#ffccc7',
  },
  process: {
    label: '处理节点',
    icon: <DatabaseOutlined style={{ color: '#1890ff' }} />,
    color: '#e6f7ff',
    borderColor: '#91d5ff',
  },
  decision: {
    label: '判断节点',
    icon: <BranchesOutlined style={{ color: '#fa8c16' }} />,
    color: '#fff7e6',
    borderColor: '#ffd591',
  },
  user: {
    label: '用户节点',
    icon: <UserOutlined style={{ color: '#722ed1' }} />,
    color: '#f9f0ff',
    borderColor: '#d3adf7',
  },
};

