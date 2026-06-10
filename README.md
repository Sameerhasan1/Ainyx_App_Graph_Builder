# ReactFlow Cloud Canvas

Frontend Intern Task implementation matching the provided dark ReactFlow canvas reference.

## Tech Stack

- React + Vite
- TypeScript strict mode
- ReactFlow (`@xyflow/react`)
- shadcn-style local UI primitives
- TanStack Query
- Zustand
- MSW mock API layer

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

## Key Decisions

- The canvas uses ReactFlow nodes, edges, minimap, controls, fit view, selection, drag, pan, zoom, and delete support.
- Mock API handlers return apps, nodes, and edges with simulated latency and occasional status changes.
- Zustand stores selected app, selected node, active inspector tab, mobile inspector state, and selected edge id.
- The inspector is fixed on desktop and turns into a slide-over drawer on small screens.
