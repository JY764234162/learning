import React, { useState, useRef, Key, useTransition } from "react";
import { Typography, Card, Alert, Space, List, Avatar } from "antd";
import styles from "./styles.module.css";
import { CSSTransition } from "react-transition-group";
const { Title, Paragraph, Text } = Typography;

interface Item {
  id: string;
  content: string;
  color: string;
}

export const Component = () => {
  const dragItemRef = useRef<string | null>(null);
  const [items, setItems] = useState<Item[]>([
    { id: "1", content: "拖拽项目 1", color: "#ff4d4f" },
    { id: "2", content: "拖拽项目 2", color: "#1890ff" },
    { id: "3", content: "拖拽项目 3", color: "#52c41a" },
    { id: "4", content: "拖拽项目 4", color: "#faad14" },
    { id: "5", content: "拖拽项目 5", color: "#722ed1" },
  ]);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const id = (e.currentTarget as HTMLDivElement).dataset.id || "";
    e.dataTransfer.setData("text/plain", id);
    e.currentTarget.style.opacity = "0.5";
    dragItemRef.current = id;
    console.log("拖动开始...", id);
  };
  // 拖动元素开始拖动时触发
  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {};
  // 拖动元素经过目标元素时触发
  const onDragOver = (e: React.DragEvent) => {
    // 阻止默认行为，使元素成为有效的放置目标( 必须 ),否则无法触发 drop 事件
    e.preventDefault();
  };
  // 拖动元素进入目标元素时触发
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).hasAttribute("draggable")) {
      const targetId = (e.currentTarget as HTMLDivElement).dataset.id;
      const targetIndex = items.findIndex((item) => item.id === targetId);
      const dragIndex = items.findIndex(
        (item) => item.id === dragItemRef.current
      );
      setItems((prevItems) => {
        const newItems = [...prevItems];
        const [draggedItem] = newItems.splice(dragIndex, 1);
        newItems.splice(targetIndex, 0, draggedItem);
        return newItems;
      });
    }
  };
  // 拖动元素离开目标元素时触发
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {};
  // 拖动元素放置到目标元素时触发
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = (e.currentTarget as HTMLDivElement).dataset.id;
    console.log("放置结束", id);
  };
  // 拖动元素结束时触发
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const id = (e.currentTarget as HTMLDivElement).dataset.id;
    console.log("拖拽结束", id);
    dragItemRef.current = null;
    e.currentTarget.style.opacity = "1";
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>原生拖拽 API 演示</Title>

      <Alert
        type="info"
        message="什么是原生拖拽 API？"
        description="HTML5 原生拖拽 API 提供了一种标准化的方式来实现拖放功能，无需额外库。通过定义拖拽源（draggable）和拖拽目标（drop target），以及处理各种拖拽事件（dragstart、dragover、drop等），可以实现丰富的交互体验。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="演示效果">
          <div className={styles.listContainer}>
            {items.map((item, index) => (
              <div
                data-id={item.id}
                data-index={index}
                draggable
                key={item.id}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    gap: 8,
                    border: "1px solid #e0e0e0",
                    borderRadius: 8,
                    background: "#fff",
                    pointerEvents: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <Avatar draggable={false} style={{ background: item.color }}>
                    {item.id}
                  </Avatar>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="功能说明">
          <Paragraph>
            <Text strong>实现功能：</Text>
          </Paragraph>
          <ul>
            <li>列表项拖拽排序</li>
            <li>拖拽时的视觉反馈</li>
            <li>完全使用原生 HTML5 拖拽 API</li>
            <li>无需任何第三方拖拽库</li>
          </ul>
        </Card>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>原生拖拽 API 的主要事件：</Text>
          </Paragraph>
          <ul>
            <li>
              <Text code>dragstart</Text>：开始拖拽元素时触发
            </li>
            <li>
              <Text code>dragover</Text>：拖拽元素经过有效放置目标时触发
            </li>
            <li>
              <Text code>dragenter</Text>：拖拽元素进入有效放置目标时触发
            </li>
            <li>
              <Text code>dragleave</Text>：拖拽元素离开有效放置目标时触发
            </li>
            <li>
              <Text code>drop</Text>：放置拖拽元素时触发
            </li>
            <li>
              <Text code>dragend</Text>：拖拽操作结束时触发
            </li>
          </ul>

          <Paragraph>
            <Text strong>代码示例：</Text>
          </Paragraph>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            {`// 设置元素可拖拽
<div 
  draggable={true}
  onDragStart={handleDragStart}
  onDragOver={handleDragOver}
  onDragEnter={handleDragEnter}
  onDrop={handleDrop}
  onDragEnd={handleDragEnd}
>
  可拖拽元素
</div>

// 处理拖拽事件
const handleDragStart = (e, index) => {
  // 记录拖拽项的索引
  dragItemRef.current = index;
  
  // 可以设置拖拽数据
  e.dataTransfer.setData("text/plain", id);
};

// 允许放置（必须阻止默认行为）
const handleDragOver = (e) => {
  e.preventDefault();
};

// 记录当前拖拽到的位置
const handleDragEnter = (index) => {
  dragOverItemRef.current = index;
};

// 处理放置逻辑
const handleDrop = () => {
  // 获取拖拽项和目标项的索引
  const dragIndex = dragItemRef.current;
  const dropIndex = dragOverItemRef.current;
  
  // 创建新数组并重新排序
  const newItems = [...items];
  const draggedItem = newItems[dragIndex];
  
  newItems.splice(dragIndex, 1);
  newItems.splice(dropIndex, 0, draggedItem);
  
  // 更新状态
  setItems(newItems);
};`}
          </pre>

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>
              必须在 dragover 事件中调用 preventDefault()
              才能使元素成为有效的放置目标
            </li>
            <li>
              使用 ref 记录拖拽项和目标项的索引，避免在事件处理中依赖状态闭包
            </li>
            <li>提供视觉反馈可以增强用户体验，如改变拖拽中项目的透明度</li>
            <li>
              如果需要跨窗口或应用拖拽，可以使用 dataTransfer 对象传递数据
            </li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

