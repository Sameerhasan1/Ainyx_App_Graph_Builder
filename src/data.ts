import type { Edge } from '@xyflow/react';
import type { CloudApp, CloudNode } from './types/cloud';

export const apps: CloudApp[] = [
  { id: 'golang', name: 'supertokens-golang', color: '#5b5ce8', icon: 'app' },
  { id: 'java', name: 'supertokens-java', color: '#8b5cf6', icon: 'worker' },
  { id: 'python', name: 'supertokens-python', color: '#ef4444', icon: 'worker' },
  { id: 'ruby', name: 'supertokens-ruby', color: '#d946ef', icon: 'worker' },
  { id: 'go', name: 'supertokens-go', color: '#8b5cf6', icon: 'worker' },
];

export const initialNodes: CloudNode[] = [
  {
    id: 'api',
    type: 'service',
    position: { x: 215, y: 115 },
    data: {
      serviceId: 'golang',
      label: 'App Server',
      kind: 'app',
      status: 'Healthy',
      costPerHour: 0.03,
      runtime: 'Go 1.22',
      description: 'Primary SuperTokens API runtime with autoscaling enabled.',
      activeMetric: 'cpu',
      metrics: { cpu: 0.02, memoryGb: 0.05, diskGb: 10, regionCount: 1 },
    },
  },
  {
    id: 'postgres',
    type: 'service',
    position: { x: 780, y: 175 },
    data: {
      serviceId: 'golang',
      label: 'Postgres',
      kind: 'postgres',
      status: 'Healthy',
      costPerHour: 0.03,
      runtime: 'Postgres 16',
      description: 'Transactional identity and session database.',
      activeMetric: 'cpu',
      metrics: { cpu: 0.02, memoryGb: 0.05, diskGb: 10, regionCount: 1 },
    },
  },
  {
    id: 'redis',
    type: 'service',
    position: { x: 330, y: 505 },
    data: {
      serviceId: 'golang',
      label: 'Redis',
      kind: 'redis',
      status: 'Down',
      costPerHour: 0.03,
      runtime: 'Redis 7',
      description: 'Low-latency cache for token sessions and rate limits.',
      activeMetric: 'cpu',
      metrics: { cpu: 0.02, memoryGb: 0.05, diskGb: 10, regionCount: 1 },
    },
  },
  {
    id: 'mongodb',
    type: 'service',
    position: { x: 835, y: 560 },
    data: {
      serviceId: 'golang',
      label: 'Mongodb',
      kind: 'mongodb',
      status: 'Down',
      costPerHour: 0.03,
      runtime: 'MongoDB 7',
      description: 'Document store used by auxiliary analytics jobs.',
      activeMetric: 'cpu',
      metrics: { cpu: 0.02, memoryGb: 0.05, diskGb: 10, regionCount: 1 },
    },
  },
];

export const initialEdges: Edge[] = [
  { id: 'api-postgres', source: 'api', target: 'postgres', animated: true },
  { id: 'api-redis', source: 'api', target: 'redis', animated: true },
  { id: 'api-mongodb', source: 'api', target: 'mongodb' },
];
