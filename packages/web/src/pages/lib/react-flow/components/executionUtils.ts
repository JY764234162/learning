import { Node, Edge } from '@xyflow/react';

/**
 * 拓扑排序，确定节点执行顺序
 */
export const topologicalSort = (nodes: Node[], edges: Edge[]): Node[] => {
  // 构建邻接表和入度
  const adjacencyList = new Map<string, string[]>();
  const inDegree = new Map<string, number>();
  const nodeMap = new Map<string, Node>();

  nodes.forEach((node) => {
    nodeMap.set(node.id, node);
    adjacencyList.set(node.id, []);
    inDegree.set(node.id, 0);
  });

  edges.forEach((edge) => {
    const source = edge.source;
    const target = edge.target;
    adjacencyList.get(source)?.push(target);
    inDegree.set(target, (inDegree.get(target) || 0) + 1);
  });

  // 找到所有入度为 0 的节点（起始节点）
  const queue: string[] = [];
  nodes.forEach((node) => {
    if (inDegree.get(node.id) === 0) {
      queue.push(node.id);
    }
  });

  // 如果没有入度为 0 的节点，返回所有节点（可能是循环图）
  if (queue.length === 0) {
    return nodes;
  }

  const result: Node[] = [];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (visited.has(nodeId)) continue;

    visited.add(nodeId);
    const node = nodeMap.get(nodeId);
    if (node) {
      result.push(node);
    }

    const neighbors = adjacencyList.get(nodeId) || [];
    neighbors.forEach((neighbor) => {
      const currentInDegree = (inDegree.get(neighbor) || 0) - 1;
      inDegree.set(neighbor, currentInDegree);

      if (currentInDegree === 0 && !visited.has(neighbor)) {
        queue.push(neighbor);
      }
    });
  }

  // 添加未访问的孤立节点
  nodes.forEach((node) => {
    if (!visited.has(node.id)) {
      result.push(node);
    }
  });

  return result;
};

/**
 * 模拟节点执行的流式接口
 */
export const mockExecuteNode = (node: Node): ReadableStream<Uint8Array> => {
  return new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      let progress = 0;

      const intervalId = setInterval(() => {
        progress += 10;
        
        if (progress <= 100) {
          const data = JSON.stringify({
            nodeId: node.id,
            progress,
            status: progress < 100 ? 'processing' : 'completed',
          });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } else {
          controller.close();
          clearInterval(intervalId);
        }
      }, 200); // 每 200ms 更新一次进度
    },
  });
};

