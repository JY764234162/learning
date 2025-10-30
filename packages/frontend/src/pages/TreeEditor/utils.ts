interface TreeNodeData {
  id: string;
  pid: string | null;
  title: string;
  key: string;
  isLeaf: boolean;
  hasChildren: boolean;
  children?: TreeNodeData[];
}


// 更新父节点的hasChildren状态
export const updateParentHasChildren = (data: TreeNodeData[], parentId: string | null, hasChildren: boolean): TreeNodeData[] => {
  if (parentId === null) return data;

  return data.map((node) => {
    if (node.key === parentId) {
      return {
        ...node,
        hasChildren,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateParentHasChildren(node.children, parentId, hasChildren),
      };
    }
    return node;
  });
};

// 添加节点到树
export const addNodeToTree = (data: TreeNodeData[], parentId: string, newNode: TreeNodeData): TreeNodeData[] => {
  return data.map((node) => {
    if (node.key === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeToTree(node.children, parentId, newNode),
      };
    }
    return node;
  });
};

// 更新树中的节点
export const updateNodeInTree = (data: TreeNodeData[], nodeId: string, updates: Partial<TreeNodeData>): TreeNodeData[] => {
  return data.map((node) => {
    if (node.key === nodeId) {
      return { ...node, ...updates };
    }
    if (node.children) {
      return {
        ...node,
        children: updateNodeInTree(node.children, nodeId, updates),
      };
    }
    return node;
  });
};

// 从树中删除节点
export const removeNodeFromTree = (data: TreeNodeData[], nodeId: string): TreeNodeData[] => {
  return data
    .filter((node) => node.key !== nodeId)
    .map((node) => ({
      ...node,
      children: node.children ? removeNodeFromTree(node.children, nodeId) : undefined,
    }));
};

// 根据key查找节点
export const findNodeByKey = (data: TreeNodeData[], key: string): TreeNodeData | null => {
  for (const node of data) {
    if (node.key === key) {
      return node;
    }
    if (node.children) {
      const found = findNodeByKey(node.children, key);
      if (found) return found;
    }
  }
  return null;
};

// 获取节点的子节点
export const getNodeChildren = (data: TreeNodeData[], parentId: string): TreeNodeData[] => {
  for (const node of data) {
    if (node.key === parentId) {
      return node.children || [];
    }
    if (node.children) {
      const children = getNodeChildren(node.children, parentId);
      if (children.length > 0) return children;
    }
  }
  return [];
};


// 更新树数据结构
  export const updateTreeData = (data: TreeNodeData[], pid: string | null, children: TreeNodeData[]): TreeNodeData[] => {
    if (pid === null) {
      return children;
    }

    return data.map((node) => {
      if (node.key === pid) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, pid, children),
        };
      }
      return node;
    });
  };
