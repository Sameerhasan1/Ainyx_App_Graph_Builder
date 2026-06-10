import type { NodeProps } from '@xyflow/react';
import { Handle, Position, useReactFlow, type Edge } from '@xyflow/react';
import { Settings } from 'lucide-react';
import type { CloudNode, CloudNodeData, MetricKey } from '../types/cloud';
import { currency } from '../lib/utils';
import { useCanvasStore } from '../store/useCanvasStore';
import { AwsMark } from './AwsMark';
import { MetricEditor } from './MetricEditor';
import { MetricTabs } from './MetricTabs';
import { ServiceIcon } from './ServiceIcon';
import { StatusBadge } from './StatusBadge';
import { Button } from './ui/button';

interface ServiceNodeProps extends NodeProps {
  data: CloudNodeData;
}

export function ServiceNode({ id, data, selected }: ServiceNodeProps) {
  const { setNodes } = useReactFlow<CloudNode, Edge>();
  const setSelectedNodeId = useCanvasStore((state) => state.setSelectedNodeId);
  const activeInspectorTab = useCanvasStore((state) => state.activeInspectorTab);
  const setActiveInspectorTab = useCanvasStore((state) => state.setActiveInspectorTab);

  const updateMetricPreview = (metric: MetricKey) => {
    setActiveInspectorTab(metric);
  };

  const updateMetricValue = (metric: MetricKey, value: number) => {
    setNodes((current) =>
      current.map((node) => {
        if (node.id !== id) return node;
        const metrics = { ...node.data.metrics };
        if (metric === 'cpu') metrics.cpu = value;
        if (metric === 'memory') metrics.memoryGb = value;
        if (metric === 'disk') metrics.diskGb = value;
        if (metric === 'region') metrics.regionCount = value;
        return { ...node, data: { ...node.data, metrics } };
      }),
    );
  };

  return (
    <article className={selected ? 'service-card selected' : 'service-card'} onClick={() => setSelectedNodeId(id)}>
      <Handle className="node-handle" type="target" position={Position.Left} />
      <div className="service-header">
        <div className="service-title">
          <ServiceIcon kind={data.kind} />
          <strong>{data.label}</strong>
        </div>
        <div className="service-actions">
          <span className="cost-pill">{currency(data.costPerHour)}</span>
          <Button variant="icon" aria-label={`Configure ${data.label}`}>
            <Settings size={19} />
          </Button>
        </div>
      </div>
      <div className="metric-values" aria-label={`${data.label} metric summary`}>
        <span>{data.metrics.cpu.toFixed(2)}</span>
        <span>{data.metrics.memoryGb.toFixed(2)} GB</span>
        <span>{data.metrics.diskGb.toFixed(2)} GB</span>
        <span>{data.metrics.regionCount}</span>
      </div>
      <MetricTabs value={activeInspectorTab} onChange={updateMetricPreview} />
      <MetricEditor activeMetric={activeInspectorTab} metrics={data.metrics} onChange={(value) => updateMetricValue(activeInspectorTab, value)} />
      <div className="service-footer">
        <StatusBadge status={data.status} />
        <AwsMark />
      </div>
      <Handle className="node-handle" type="source" position={Position.Right} />
    </article>
  );
}
