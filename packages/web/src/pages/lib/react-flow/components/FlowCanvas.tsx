import React, { useCallback, useState, DragEvent, useMemo, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  useReactFlow,
  NodeTypes,
  Panel,
} from "@xyflow/react";
import { Button, Space, Tooltip, Dropdown } from "antd";
import { 
  AlignLeftOutlined, 
  AlignCenterOutlined, 
  AppstoreOutlined,
  BgColorsOutlined,
  DownOutlined,
} from "@ant-design/icons";
import dagre from "dagre";
import { nodeTypes } from "./nodeTypes";
import { CustomNode } from "./CustomNode";
import { NodeEditorDrawer } from "./NodeEditorDrawer";
import { localStg } from "@/utils/storage";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export const FlowCanvas = () => {
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  
  // 编辑抽屉状态
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<Node | null>(null);

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedNodes = localStg.get('reactFlowNodes' as keyof StorageType.Local);
    const savedEdges = localStg.get('reactFlowEdges' as keyof StorageType.Local);
    
    if (savedNodes && Array.isArray(savedNodes)) {
      setNodes(savedNodes as Node[]);
    }
    if (savedEdges && Array.isArray(savedEdges)) {
      setEdges(savedEdges as Edge[]);
    }
  }, []);
  
  // 保存数据到 localStorage（节点或边变化时）
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      localStg.set('reactFlowNodes' as keyof StorageType.Local, nodes as any);
      localStg.set('reactFlowEdges' as keyof StorageType.Local, edges as any);
    }
  }, [nodes, edges]);

  // 定义自定义节点类型
  const customNodeTypes: NodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // 节点点击处理
  const handleNodeClick = useCallback((nodeId: string, nodeData: any) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setEditingNode(node);
      setDrawerOpen(true);
    }
  }, [nodes]);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // 检查是否是有效的节点类型
      if (!nodeTypes[type as keyof typeof nodeTypes]) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: "custom",
        position,
        data: {
          label: nodeTypes[type as keyof typeof nodeTypes].label,
          nodeType: type,
          onNodeClick: handleNodeClick,
          description: '',
          status: 'pending',
          notes: '',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, handleNodeClick]
  );

  // Dagre 层次布局
  const onDagreLayout = useCallback(
    (direction: 'TB' | 'BT' | 'LR' | 'RL') => {
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));

      const nodeWidth = 200;
      const nodeHeight = 80;

      dagreGraph.setGraph({
        rankdir: direction,
        nodesep: 100,
        ranksep: 100,
      });

      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
      });

      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
          ...node,
          position: {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
          },
        };
      });

      setNodes(layoutedNodes);

      // 自动居中显示
      window.requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: 0.2, duration: 300 });
      });
    },
    [nodes, edges, reactFlowInstance]
  );

  // 网格布局
  const onGridLayout = useCallback(() => {
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const nodeWidth = 200;
    const nodeHeight = 80;
    const spacing = 150;

    const layoutedNodes = nodes.map((node, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      return {
        ...node,
        position: {
          x: col * (nodeWidth + spacing),
          y: row * (nodeHeight + spacing),
        },
      };
    });

    setNodes(layoutedNodes);

    window.requestAnimationFrame(() => {
      reactFlowInstance.fitView({ padding: 0.2, duration: 300 });
    });
  }, [nodes, reactFlowInstance]);

  // 圆形布局
  const onCircleLayout = useCallback(() => {
    const radius = Math.max(300, nodes.length * 50);
    const centerX = 0;
    const centerY = 0;

    const layoutedNodes = nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      return {
        ...node,
        position: {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        },
      };
    });

    setNodes(layoutedNodes);

    window.requestAnimationFrame(() => {
      reactFlowInstance.fitView({ padding: 0.2, duration: 300 });
    });
  }, [nodes, reactFlowInstance]);

  // 保存节点编辑
  const handleSaveNode = useCallback((nodeId: string, updatedData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updatedData,
            },
          };
        }
        return node;
      })
    );
  }, []);

  // 确保所有现有节点都有 onNodeClick 回调
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onNodeClick: handleNodeClick,
        },
      }))
    );
  }, [handleNodeClick]);

  return (
    <div style={{ flex: 1, height: "calc(100vh - 100px)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
        
        {/* 自动布局控制面板 */}
        <Panel position="top-right">
          <Space>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'TB',
                    label: '从上到下',
                    icon: <AlignCenterOutlined rotate={90} />,
                    onClick: () => onDagreLayout('TB'),
                  },
                  {
                    key: 'BT',
                    label: '从下到上',
                    icon: <AlignCenterOutlined rotate={-90} />,
                    onClick: () => onDagreLayout('BT'),
                  },
                  {
                    key: 'LR',
                    label: '从左到右',
                    icon: <AlignLeftOutlined />,
                    onClick: () => onDagreLayout('LR'),
                  },
                  {
                    key: 'RL',
                    label: '从右到左',
                    icon: <AlignLeftOutlined rotate={180} />,
                    onClick: () => onDagreLayout('RL'),
                  },
                ],
              }}
            >
              <Button size="small">
                层次布局 <DownOutlined />
              </Button>
            </Dropdown>

            <Tooltip title="网格排列">
              <Button
                icon={<AppstoreOutlined />}
                onClick={onGridLayout}
                size="small"
              >
                网格布局
              </Button>
            </Tooltip>

            <Tooltip title="圆形排列">
              <Button
                icon={<BgColorsOutlined />}
                onClick={onCircleLayout}
                size="small"
              >
                圆形布局
              </Button>
            </Tooltip>
          </Space>
        </Panel>
      </ReactFlow>

      {/* 节点编辑抽屉 */}
      <NodeEditorDrawer
        open={drawerOpen}
        node={editingNode}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveNode}
      />
    </div>
  );
};
