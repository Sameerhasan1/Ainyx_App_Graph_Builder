import { useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type OnSelectionChangeParams,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { patchNode } from '../api';
import type { CloudNode, InspectorPatch, MetricKey, ServiceStatus } from '../types/cloud';
import { useCanvasStore } from '../store/useCanvasStore';
import { CanvasToolbar } from './CanvasToolbar';
import { Inspector } from './Inspector';
import { ServiceNode } from './ServiceNode';

const nodeTypes = { service: ServiceNode };

interface CloudCanvasProps {
  nodes: CloudNode[];
  edges: Edge[];
}

function CloudCanvasInner({ nodes: incomingNodes, edges: incomingEdges }: CloudCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<CloudNode>(incomingNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(incomingEdges);
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useCanvasStore((state) => state.setSelectedNodeId);
  const setSelectedEdgeId = useCanvasStore((state) => state.setSelectedEdgeId);
  const nodePatchMutation = useMutation({
    mutationFn: ({ nodeId, patch }: { nodeId: string; patch: InspectorPatch }) => patchNode(nodeId, patch),
  });

  useEffect(() => {
    setNodes(incomingNodes);
    setEdges(incomingEdges);
  }, [incomingEdges, incomingNodes, setEdges, setNodes]);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

  const onConnect = useCallback((connection: Connection) => setEdges((current) => addEdge(connection, current)), [setEdges]);

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes, edges: selectedEdges }: OnSelectionChangeParams) => {
      if (selectedNodes[0]) {
        setSelectedNodeId(selectedNodes[0].id);
      } else if (selectedEdges[0]) {
        setSelectedEdgeId(selectedEdges[0].id);
      }
    },
    [setSelectedEdgeId, setSelectedNodeId],
  );

  const deleteSelection = useCallback(() => {
    setNodes((current) => current.filter((node) => !node.selected && node.id !== selectedNodeId));
    setEdges((current) => current.filter((edge) => !edge.selected));
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, [selectedNodeId, setEdges, setNodes, setSelectedEdgeId, setSelectedNodeId]);

  const changeMetric = (nodeId: string, metric: MetricKey, value: number) => {
    setNodes((current) =>
      current.map((node) => {
        if (node.id !== nodeId) return node;
        const metrics = { ...node.data.metrics };
        if (metric === 'cpu') metrics.cpu = value;
        if (metric === 'memory') metrics.memoryGb = value;
        if (metric === 'disk') metrics.diskGb = value;
        if (metric === 'region') metrics.regionCount = value;
        return { ...node, data: { ...node.data, metrics } };
      }),
    );
    nodePatchMutation.mutate({
      nodeId,
      patch:
        metric === 'cpu'
          ? { cpu: value }
          : metric === 'memory'
            ? { memoryGb: value }
            : metric === 'disk'
              ? { diskGb: value }
              : { regionCount: value },
    });
  };

  const changeStatus = (nodeId: string, status: ServiceStatus) => {
    setNodes((current) =>
      current.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, status } } : node)),
    );
    nodePatchMutation.mutate({ nodeId, patch: { status } });
  };

  const changeDescription = (nodeId: string, description: string) => {
    setNodes((current) =>
      current.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, description } } : node)),
    );
    nodePatchMutation.mutate({ nodeId, patch: { description } });
  };

  return (
    <main className="canvas-shell">
      <ReactFlow
        className="cloud-flow"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        deleteKeyCode={['Backspace', 'Delete']}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        minZoom={0.35}
        maxZoom={1.4}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#25272a" />
        <Controls position="bottom-right" />
        <MiniMap position="bottom-left" pannable zoomable nodeColor="#1e293b" maskColor="rgba(0,0,0,.35)" />
        <CanvasToolbar onDeleteSelection={deleteSelection} />
      </ReactFlow>
      <Inspector node={selectedNode} onMetricChange={changeMetric} onStatusChange={changeStatus} onDescriptionChange={changeDescription} />
    </main>
  );
}

export function CloudCanvas(props: CloudCanvasProps) {
  return (
    <ReactFlowProvider>
      <CloudCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
