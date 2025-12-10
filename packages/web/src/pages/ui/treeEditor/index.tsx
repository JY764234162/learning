import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Tree, Card, Button, Input, Form, Modal, Space, message, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, FolderOutlined, FileOutlined } from "@ant-design/icons";
import type { DataNode, TreeProps } from "antd/es/tree";
import {
  addNodeToTree,
  findNodeByKey,
  getNodeChildren,
  removeNodeFromTree,
  updateNodeInTree,
  updateParentHasChildren,
  updateTreeData,
} from "./utils";

interface TreeNodeData {
  id: string;
  pid: string | null;
  title: string;
  key: string;
  isLeaf: boolean;
  hasChildren: boolean;
  children?: TreeNodeData[];
}

// 模拟异步API请求
const mockApi = {
  // 根据父节点ID获取子节点
  getChildrenByPid: async (pid: string | null): Promise<TreeNodeData[]> => {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (pid === null) {
      // 根节点数据
      return [
        { id: "1", pid: null, title: "系统管理", key: "1", isLeaf: false, hasChildren: true },
        { id: "2", pid: null, title: "用户管理", key: "2", isLeaf: false, hasChildren: true },
        { id: "3", pid: null, title: "日志管理", key: "3", isLeaf: true, hasChildren: false },
      ];
    }

    // 根据父ID返回不同的子节点数据
    const mockData: Record<string, TreeNodeData[]> = {
      "1": [
        { id: "1-1", pid: "1", title: "权限管理", key: "1-1", isLeaf: false, hasChildren: true },
        { id: "1-2", pid: "1", title: "菜单管理", key: "1-2", isLeaf: true, hasChildren: false },
      ],
      "2": [
        { id: "2-1", pid: "2", title: "用户列表", key: "2-1", isLeaf: true, hasChildren: false },
        { id: "2-2", pid: "2", title: "角色管理", key: "2-2", isLeaf: false, hasChildren: true },
      ],
      "1-1": [
        { id: "1-1-1", pid: "1-1", title: "角色权限", key: "1-1-1", isLeaf: true, hasChildren: false },
        { id: "1-1-2", pid: "1-1", title: "用户权限", key: "1-1-2", isLeaf: true, hasChildren: false },
      ],
      "2-2": [
        { id: "2-2-1", pid: "2-2", title: "管理员", key: "2-2-1", isLeaf: true, hasChildren: false },
        { id: "2-2-2", pid: "2-2", title: "普通用户", key: "2-2-2", isLeaf: true, hasChildren: false },
      ],
    };

    return mockData[pid] || [];
  },

  // 创建新节点
  createNode: async (pid: string | null, title: string): Promise<TreeNodeData> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newId = `${pid || "root"}-${Date.now()}`;
    return {
      id: newId,
      pid,
      title,
      key: newId,
      isLeaf: true,
      hasChildren: false,
    };
  },

  // 更新节点
  updateNode: async (id: string, title: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  },

  // 删除节点
  deleteNode: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
};

export const Component = () => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [currentNode, setCurrentNode] = useState<TreeNodeData | null>(null);
  const [form] = Form.useForm();

  // 加载根节点数据
  useEffect(() => {
    loadNodeData(null);
  }, []);

  // 加载节点数据
  const loadNodeData = async (pid: string | null) => {
    try {
      const children = await mockApi.getChildrenByPid(pid);

      if (pid === null) {
        // 根节点数据
        setTreeData(children);
      } else {
        // 更新树数据，添加子节点
        setTreeData((prevData) => {
          const updatedData = updateTreeData(prevData, pid, children);
          // 更新父节点的hasChildren状态
          return updateParentHasChildren(updatedData, pid, children.length > 0);
        });
      }
    } catch (error) {
      window.$message?.error("加载数据失败");
    }
  };

  // 显示新增节点模态框
  const showAddModal = (node: TreeNodeData) => {
    setCurrentNode(node);
    setModalType("add");
    setModalVisible(true);
    form.resetFields();
  };

  // 显示编辑节点模态框
  const showEditModal = (node: TreeNodeData) => {
    setCurrentNode(node);
    setModalType("edit");
    setModalVisible(true);
    form.setFieldsValue({ title: node.title });
  };

  // 处理模态框确认
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (modalType === "add") {
        await handleAddNode(values.title);
      } else {
        await handleEditNode(values.title);
      }

      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      // 表单验证失败
    }
  };

  // 新增节点
  const handleAddNode = async (title: string) => {
    if (!currentNode) return;

    try {
      const newNode = await mockApi.createNode(currentNode.key as string, title);

      // 更新树数据
      setTreeData((prevData) => {
        const updatedData = addNodeToTree(prevData, currentNode.key as string, newNode);
        // 更新父节点的hasChildren状态
        return updateParentHasChildren(updatedData, currentNode.key as string, true);
      });

      // // 展开父节点
      // if (!expandedKeys.includes(currentNode.key)) {
      //   setExpandedKeys([...expandedKeys, currentNode.key]);
      // }

      window.$message?.success("新增节点成功");
    } catch (error) {
      window.$message?.error("新增节点失败");
    }
  };

  // 编辑节点
  const handleEditNode = async (title: string) => {
    if (!currentNode) return;

    try {
      await mockApi.updateNode(currentNode.key as string, title);

      // 更新树数据
      setTreeData((prevData) => updateNodeInTree(prevData, currentNode.key as string, { title }));

      window.$message?.success("编辑节点成功");
    } catch (error) {
      window.$message?.error("编辑节点失败");
    }
  };

  // 删除节点
  const handleDeleteNode = async (node: TreeNodeData) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除节点 "${node.title}" 吗？`,
      onOk: async () => {
        try {
          await mockApi.deleteNode(node.key as string);
          // 更新树数据
          setTreeData((prevData) => {
            const updatedData = removeNodeFromTree(prevData, node.key as string);
            // 如果删除的是父节点的最后一个子节点，更新父节点的hasChildren状态
            if (node.pid) {
              const parentChildren = getNodeChildren(updatedData, node.pid);
              return updateParentHasChildren(updatedData, node.pid, parentChildren.length > 0);
            }
            return updatedData;
          });

          window.$message?.success("删除节点成功");
        } catch (error) {
          window.$message?.error("删除节点失败");
        }
      },
    });
  };

  // 自定义树节点渲染
  const renderTreeNode = (node: TreeNodeData) => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          {node.hasChildren ? <FolderOutlined style={{ marginRight: 8 }} /> : <FileOutlined style={{ marginRight: 8 }} />}
          {node.title}
        </span>
        <Space>
          <Button
            type="text"
            icon={<PlusOutlined />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              showAddModal(node);
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              showEditModal(node);
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNode(node);
            }}
          />
        </Space>
      </div>
    );
  };

  // 转换树数据为Ant Design Tree格式
  const convertToTreeData = (data: TreeNodeData[]): DataNode[] => {
    return data.map((node) => ({
      title: renderTreeNode(node),
      key: node.key,
      isLeaf: !node.hasChildren, // 关键：只有当hasChildren为false时才是叶子节点
      children: node.children ? convertToTreeData(node.children) : undefined,
    }));
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card title="树编辑器" style={{ maxWidth: 800, margin: "0 auto" }}>
        <Tree
          treeData={convertToTreeData(treeData)}
          loadData={async (node) => {
            // 只有当节点有子节点且子节点数据未加载时才加载数据
            // 注意：这里的node是Ant Design的DataNode类型，需要通过key查找原始数据
            const originalNode = findNodeByKey(treeData, node.key as string);
            if (!originalNode || !originalNode.hasChildren || node.children) {
              return;
            }
            await loadNodeData(node.key as string);
          }}
          showLine
          showIcon={false}
        />
      </Card>

      <Modal
        title={modalType === "add" ? "新增节点" : "编辑节点"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="节点名称" rules={[{ required: true, message: "请输入节点名称" }]}>
            <Input placeholder="请输入节点名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
