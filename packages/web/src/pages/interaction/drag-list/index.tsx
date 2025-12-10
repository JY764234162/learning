import React, { useState } from "react";
import "./style.css";
import { SetStateAction, useAtom } from "jotai";
import { DropPosition, dropPositionAtom } from "./state/jotai";
import { Typography, Card, Alert, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

export const Component = () => {
  // 将状态提升到父组件
  const [lists, setLists] = useState({
    list1: [1, 2, 3],
    list2: [4, 5, 6],
  });

  const [dropPosition, setDropPosition] = useAtom(dropPositionAtom);

  // 处理列表项的移动
  const handleMove = (
    sourceListId: string,
    targetListId: string,
    item: number,
    targetIndex: number
  ) => {
    setLists((prev) => {
      const newLists = { ...prev };

      // 如果是同一个列表内的拖拽
      if (sourceListId === targetListId) {
        const currentList = [...prev[sourceListId as keyof typeof lists]];
        const sourceIndex = currentList.indexOf(item);
        // 先删除，再插入
        currentList.splice(sourceIndex, 1);
        currentList.splice(targetIndex, 0, item);
        newLists[sourceListId as keyof typeof lists] = currentList;
      } else {
        // 不同列表间的拖拽
        // 从源列表中删除
        newLists[sourceListId as keyof typeof lists] = prev[
          sourceListId as keyof typeof lists
        ].filter((i) => i !== item);

        // 添加到目标列表
        const targetList = [...prev[targetListId as keyof typeof lists]];
        targetList.splice(targetIndex, 0, item);
        newLists[targetListId as keyof typeof lists] = targetList;
      }

      return newLists;
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>拖拽列表演示</Title>

      <Alert
        type="info"
        message="什么是拖拽列表？"
        description="拖拽列表是一种允许用户通过拖放操作重新排序或在不同列表间移动项目的交互组件。它提供了直观的用户体验，常用于任务管理、文件组织等场景。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="演示效果">
          <div className="drag-list-container">
            <DragList
              id="list1"
              items={lists.list1}
              onMove={handleMove}
              setDropPosition={setDropPosition}
              dropPosition={dropPosition}
            />
            <DragList
              id="list2"
              items={lists.list2}
              onMove={handleMove}
              setDropPosition={setDropPosition}
              dropPosition={dropPosition}
            />
          </div>
        </Card>

        <Card title="功能说明">
          <Paragraph>
            <Text strong>实现原理：</Text>
          </Paragraph>
          <ul>
            <li>使用 HTML5 原生拖拽 API</li>
            <li>通过 jotai 状态管理拖拽位置</li>
            <li>CSS 过渡动画提升用户体验</li>
            <li>支持列表内排序和跨列表拖拽</li>
          </ul>

          <Paragraph>
            <Text strong>关键特性：</Text>
          </Paragraph>
          <ul>
            <li>拖拽时显示插入位置指示器</li>
            <li>平滑的动画过渡效果</li>
            <li>支持跨列表项目移动</li>
            <li>自适应列表高度</li>
          </ul>

          <Paragraph>
            <Text strong>使用场景：</Text>
          </Paragraph>
          <ul>
            <li>任务看板</li>
            <li>文件管理器</li>
            <li>优先级排序</li>
            <li>分类管理</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
}

interface DragListProps {
  id: string;
  items: number[];
  onMove: (
    sourceListId: string,
    targetListId: string,
    item: number,
    targetIndex: number
  ) => void;
  setDropPosition: any;
  dropPosition: DropPosition | null;
}

const DragList = ({
  id,
  items,
  onMove,
  setDropPosition,
  dropPosition,
}: DragListProps) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, item: number) => {
    // 存储源列表 ID 和拖动项
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        listId: id,
        item: item,
      })
    );
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const index = Number(e.currentTarget.getAttribute("data-index"));
    const rect = e.currentTarget.getBoundingClientRect();
    const midPoint = rect.top + rect.height / 2;

    if (e.clientY < midPoint) {
      setDropPosition({ listId: id, index, position: "top" });
    } else {
      setDropPosition({ listId: id, index, position: "bottom" });
    }
  };
  const onDragLeave = () => {
    setDropPosition(null);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { listId: sourceListId, item } = data;
      if (dropPosition?.position === "top") {
        onMove(
          sourceListId,
          id,
          item,
          targetIndex - 1 < 0 ? 0 : targetIndex - 1
        );
      } else {
        onMove(sourceListId, id, item, targetIndex);
      }
    } catch (error) {
      console.error("Drop error:", error);
    } finally {
      setDropPosition(null);
    }
  };

  const onDragEnd = () => {
    setDropPosition(null);
  };

  return (
    <div className="drag-list">
      <h3>列表 {id}</h3>
      {items.map((item, index) => (
        <div
          data-id={id}
          data-index={index}
          className={`drag-list-item ${
            dropPosition?.index === index && dropPosition?.listId === id
              ? `drop-${dropPosition.position}`
              : ""
          }`}
          key={item}
          draggable
          onDragStart={(e) => onDragStart(e, item)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
          onDragLeave={onDragLeave}
          onDragEnd={onDragEnd}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
