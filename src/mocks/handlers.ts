import { delay, http, HttpResponse } from 'msw';
import { apps, initialEdges, initialNodes } from '../data';
import type { InspectorPatch } from '../types/cloud';

export const handlers = [
  http.get('/api/apps', async () => {
    await delay(450);
    return HttpResponse.json(apps);
  }),
  http.get('/api/:appId/graph', async () => {
    await delay(650);
    const shouldFlip = Math.random() > 0.82;
    const nodes = initialNodes.map((node) =>
      shouldFlip && node.id === 'redis'
        ? { ...node, data: { ...node.data, status: node.data.status === 'Down' ? 'Degraded' : 'Down' } }
        : node,
    );
    return HttpResponse.json({ nodes, edges: initialEdges });
  }),
  http.patch('/api/nodes/:nodeId', async ({ params, request }) => {
    await delay(320);
    const patch = (await request.json()) as InspectorPatch;
    const node = initialNodes.find((item) => item.id === params.nodeId);

    if (!node) {
      return HttpResponse.json({ message: 'Node not found' }, { status: 404 });
    }

    if (Math.random() > 0.96) {
      return HttpResponse.json({ message: 'Simulated update failure' }, { status: 500 });
    }

    return HttpResponse.json({
      ...node,
      data: {
        ...node.data,
        status: patch.status ?? node.data.status,
        description: patch.description ?? node.data.description,
        metrics: {
          cpu: patch.cpu ?? node.data.metrics.cpu,
          memoryGb: patch.memoryGb ?? node.data.metrics.memoryGb,
          diskGb: patch.diskGb ?? node.data.metrics.diskGb,
          regionCount: patch.regionCount ?? node.data.metrics.regionCount,
        },
      },
    });
  }),
];
