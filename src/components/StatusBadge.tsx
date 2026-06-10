import { AlertTriangle, CheckCircle2, CircleDashed } from 'lucide-react';
import type { ServiceStatus } from '../types/cloud';

export function StatusBadge({ status }: { status: ServiceStatus }) {
  const Icon = status === 'Healthy' ? CheckCircle2 : status === 'Degraded' ? CircleDashed : AlertTriangle;
  return (
    <span className={`status-badge status-${status.toLowerCase()}`}>
      <Icon size={16} />
      {status === 'Healthy' ? 'Success' : status === 'Down' ? 'Error' : 'Warning'}
    </span>
  );
}
