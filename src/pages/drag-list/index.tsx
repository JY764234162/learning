import React, { useState } from "react";
import "./style.css";

export default function DragListPage() {
  // 将状态提升到父组件
  const [lists, setLists] = useState({
    list1: [1, 2, 3],
    list2: [4, 5, 6],
  });

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
    <div className="drag-list-container">
      <DragList id="list1" items={lists.list1} onMove={handleMove} />
      <DragList id="list2" items={lists.list2} onMove={handleMove} />
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
}

const DragList = ({ id, items, onMove }: DragListProps) => {
  const [dropPosition, setDropPosition] = useState<{
    index: number;
    position: "top" | "bottom";
  } | null>(null);

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
      setDropPosition({ index, position: "top" });
    } else {
      setDropPosition({ index, position: "bottom" });
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { listId: sourceListId, item } = data;

      onMove(sourceListId, id, item, targetIndex);
    } catch (error) {
      console.error("Drop error:", error);
    }
  };

  return (
    <div className="drag-list">
      <h3>列表 {id}</h3>
      {items.map((item, index) => (
        <div
          data-id={id}
          data-index={index}
          className={`drag-list-item ${
            dropPosition?.index === index ? `drop-${dropPosition.position}` : ""
          }`}
          key={item}
          draggable
          onDragStart={(e) => onDragStart(e, item)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
          //   onDragEnter={onDragEnter}
          //   onDragLeave={onDragLeave}
        >
          {item}
        </div>
      ))}
      <div
        className="drag-list-item empty"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, items.length)}
      />
    </div>
  );
};
