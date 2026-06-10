import type { Edge } from '@xyflow/react';
import type { CloudApp, CloudNode, InspectorPatch } from './types/cloud';

export interface GraphResponse {
  nodes: CloudNode[];
  edges: Edge[];
}

export async function fetchApps(): Promise<CloudApp[]> {
  const response = await fetch('/api/apps');
  if (!response.ok) {
    throw new Error('Failed to load applications');
  }
  return response.json() as Promise<CloudApp[]>;
}

export async function fetchGraph(appId: string): Promise<GraphResponse> {
  const response = await fetch(`/api/${appId}/graph`);
  if (!response.ok) {
    throw new Error('Failed to load graph');
  }
  return response.json() as Promise<GraphResponse>;
}

export async function patchNode(nodeId: string, patch: InspectorPatch): Promise<CloudNode> {
  const response = await fetch(`/api/nodes/${nodeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patch),
  });

  if (!response.ok) {
    throw new Error('Failed to update node');
  }

  return response.json() as Promise<CloudNode>;
}
