export type ServiceStatus = 'Healthy' | 'Degraded' | 'Down';

export type ServiceKind = 'app' | 'postgres' | 'redis' | 'mongodb' | 'worker';

export type MetricKey = 'cpu' | 'memory' | 'disk' | 'region';

export interface CloudApp {
  id: string;
  name: string;
  color: string;
  icon: ServiceKind;
}

export interface MetricValues {
  cpu: number;
  memoryGb: number;
  diskGb: number;
  regionCount: number;
}

export interface CloudNodeData extends Record<string, unknown> {
  serviceId: string;
  label: string;
  kind: ServiceKind;
  status: ServiceStatus;
  costPerHour: number;
  metrics: MetricValues;
  runtime: string;
  description: string;
  activeMetric: MetricKey;
}

export type CloudNode = import('@xyflow/react').Node<CloudNodeData>;

export interface InspectorPatch {
  cpu?: number;
  memoryGb?: number;
  diskGb?: number;
  regionCount?: number;
  status?: ServiceStatus;
  description?: string;
}
