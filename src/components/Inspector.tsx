import { X } from 'lucide-react';
import type { CloudNode, MetricKey, ServiceStatus } from '../types/cloud';
import { useCanvasStore } from '../store/useCanvasStore';
import { currency } from '../lib/utils';
import { AwsMark } from './AwsMark';
import { MetricEditor } from './MetricEditor';
import { MetricTabs } from './MetricTabs';
import { ServiceIcon } from './ServiceIcon';
import { StatusBadge } from './StatusBadge';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface InspectorProps {
  node: CloudNode | null;
  onMetricChange: (nodeId: string, metric: MetricKey, value: number) => void;
  onStatusChange: (nodeId: string, status: ServiceStatus) => void;
  onDescriptionChange: (nodeId: string, value: string) => void;
}

const statusOptions: ServiceStatus[] = ['Healthy', 'Degraded', 'Down'];

export function Inspector({ node, onMetricChange, onStatusChange, onDescriptionChange }: InspectorProps) {
  const mobileOpen = useCanvasStore((state) => state.mobileInspectorOpen);
  const setMobileOpen = useCanvasStore((state) => state.setMobileInspectorOpen);
  const selectedEdgeId = useCanvasStore((state) => state.selectedEdgeId);
  const activeTab = useCanvasStore((state) => state.activeInspectorTab);
  const setActiveTab = useCanvasStore((state) => state.setActiveInspectorTab);

  if (!node) {
    return (
      <aside className={mobileOpen ? 'inspector open' : 'inspector'}>
        <div className="inspector-empty">
          <strong>{selectedEdgeId ? 'Edge selected' : 'No node selected'}</strong>
          <span>{selectedEdgeId ? selectedEdgeId : 'Select any service card to inspect it.'}</span>
        </div>
      </aside>
    );
  }

  const { data } = node;

  return (
    <aside className={mobileOpen ? 'inspector open' : 'inspector'} aria-label="Service inspector">
      <div className="inspector-header">
        <div className="service-title">
          <ServiceIcon kind={data.kind} />
          <div>
            <strong>{data.label}</strong>
            <span>{data.runtime}</span>
          </div>
        </div>
        <Button variant="icon" className="drawer-close" aria-label="Close inspector" onClick={() => setMobileOpen(false)}>
          <X size={18} />
        </Button>
      </div>
      <div className="inspector-row">
        <StatusBadge status={data.status} />
        <span className="cost-pill">{currency(data.costPerHour)}</span>
      </div>
      <MetricTabs value={activeTab} onChange={setActiveTab} />
      <MetricEditor activeMetric={activeTab} metrics={data.metrics} onChange={(value) => onMetricChange(node.id, activeTab, value)} />
      <div className="stats-table">
        <div>
          <span>CPU</span>
          <strong>{data.metrics.cpu.toFixed(2)}</strong>
        </div>
        <div>
          <span>Memory</span>
          <strong>{data.metrics.memoryGb.toFixed(2)} GB</strong>
        </div>
        <div>
          <span>Disk</span>
          <strong>{data.metrics.diskGb.toFixed(2)} GB</strong>
        </div>
        <div>
          <span>Regions</span>
          <strong>{data.metrics.regionCount}</strong>
        </div>
      </div>
      <label className="field-label">
        Status
        <select className="select" value={data.status} onChange={(event) => onStatusChange(node.id, event.target.value as ServiceStatus)}>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <label className="field-label">
        Description
        <textarea value={data.description} onChange={(event) => onDescriptionChange(node.id, event.target.value)} />
      </label>
      <label className="field-label disk-field">
        Disk label
        <Input value={`${data.metrics.diskGb.toFixed(2)} GB`} readOnly />
      </label>
      <div className="inspector-footer">
        <AwsMark />
      </div>
    </aside>
  );
}
