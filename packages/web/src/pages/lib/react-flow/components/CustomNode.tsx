import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined, 
  SyncOutlined 
} from '@ant-design/icons';
import { nodeTypes } from './nodeTypes';

export const CustomNode = ({ data, id }: NodeProps) => {
  const nodeType = data.nodeType as string;
  const config = nodeTypes[nodeType];

  if (!config) {
    return <div>Unknown node type</div>;
  }

  const handleClick = () => {
    // 触发自定义事件，通知父组件打开编辑抽屉
    if (typeof data.onNodeClick === 'function') {
      data.onNodeClick(id, data);
    }
  };

  // 根据状态获取图标和颜色
  const getStatusIcon = () => {
    const status = data.status as string;
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />;
      case 'failed':
        return <CloseCircleOutlined style={{ color: '#f5222d', fontSize: '16px' }} />;
      case 'processing':
        return <SyncOutlined spin style={{ color: '#1890ff', fontSize: '16px' }} />;
      case 'pending':
      default:
        return <ClockCircleOutlined style={{ color: '#d9d9d9', fontSize: '16px' }} />;
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: config.color,
        border: `2px solid ${config.borderColor}`,
        borderRadius: nodeType === 'decision' ? '0' : '8px',
        padding: '8px 12px',
        width: '180px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      {config.icon}
      <span style={{ 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        flex: 1,
        textAlign: 'left',
      }}>
        {(data.label as string) || config.label}
      </span>
      
      {/* 状态图标 */}
      <div style={{ marginLeft: 'auto' }}>
        {getStatusIcon()}
      </div>
      
      {/* 连接点 */}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ 
          background: '#555',
          width: '10px',
          height: '10px',
          border: '2px solid #fff',
        }} 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ 
          background: '#555',
          width: '10px',
          height: '10px',
          border: '2px solid #fff',
        }}
      />
    </div>
  );
};

