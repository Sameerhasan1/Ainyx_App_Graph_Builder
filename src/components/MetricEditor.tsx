import type { MetricKey, MetricValues } from '../types/cloud';
import { Input } from './ui/input';

interface MetricEditorProps {
  activeMetric: MetricKey;
  metrics: MetricValues;
  onChange: (value: number) => void;
}

export function MetricEditor({ activeMetric, metrics, onChange }: MetricEditorProps) {
  const value =
    activeMetric === 'cpu'
      ? metrics.cpu
      : activeMetric === 'memory'
        ? metrics.memoryGb
        : activeMetric === 'disk'
          ? metrics.diskGb
          : metrics.regionCount;

  const max = activeMetric === 'cpu' ? 1 : activeMetric === 'region' ? 8 : 100;
  const step = activeMetric === 'region' ? 1 : 0.01;

  return (
    <div className="metric-editor">
      <input
        aria-label={`${activeMetric} slider`}
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <Input
        aria-label={`${activeMetric} value`}
        type="number"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
