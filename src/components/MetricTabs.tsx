import { Cpu, Database, HardDrive, MemoryStick } from 'lucide-react';
import { Tabs } from './ui/tabs';
import type { MetricKey } from '../types/cloud';

interface MetricTabsProps {
  value: MetricKey;
  onChange: (metric: MetricKey) => void;
}

export function MetricTabs({ value, onChange }: MetricTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={onChange}
      items={[
        { value: 'cpu', label: 'CPU', icon: <Cpu size={17} /> },
        { value: 'memory', label: 'Memory', icon: <MemoryStick size={17} /> },
        { value: 'disk', label: 'Disk', icon: <HardDrive size={17} /> },
        { value: 'region', label: 'Region', icon: <Database size={17} /> },
      ]}
    />
  );
}
