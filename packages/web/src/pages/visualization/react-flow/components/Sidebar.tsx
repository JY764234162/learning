import React, { DragEvent } from 'react';
import { Card, Typography, Space } from 'antd';
import { nodeTypes } from './nodeTypes';

export const Sidebar = () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    
    // 创建自定义拖拽图像
    const dragImage = event.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.opacity = '0.8';
    document.body.appendChild(dragImage);
    
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    
    // 清理拖拽图像
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  return (
    <div
      style={{
        width: 'auto',
        minWidth: '212px',
        padding: '16px',
        background: '#fafafa',
        borderRight: '1px solid #d9d9d9',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography.Title level={4} style={{ marginBottom: '16px', width: '100%', textAlign: 'center' }}>
        节点面板
      </Typography.Title>

      <Space direction="vertical" style={{ width: '180px' }}>
        {Object.entries(nodeTypes).map(([type, config]) => (
          <Card
            key={type}
            size="small"
            style={{
              cursor: 'grab',
              userSelect: 'none',
              background: config.color,
              borderColor: config.borderColor,
              borderWidth: 2,
              borderRadius: type === 'decision' ? '0' : '8px',
              width: '180px',
            }}
            bodyStyle={{
              padding: '8px 12px',
            }}
            onDragStart={(event) => onDragStart(event, type)}
            draggable
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              {config.icon}
              <span>{config.label}</span>
            </div>
          </Card>
        ))}
      </Space>

      <Typography.Text
        type="secondary"
        style={{ display: 'block', marginTop: '16px', fontSize: '12px', textAlign: 'center', width: '180px' }}
      >
        拖拽节点到右侧画布中创建流程
      </Typography.Text>
    </div>
  );
};

