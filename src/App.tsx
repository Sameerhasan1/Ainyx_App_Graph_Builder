import { useQuery } from '@tanstack/react-query';
import { fetchApps, fetchGraph } from './api';
import { ApplicationPanel } from './components/ApplicationPanel';
import { Button } from './components/ui/button';
import { CloudCanvas } from './components/CloudCanvas';
import { LeftRail } from './components/LeftRail';
import { TopBar } from './components/TopBar';
import { useCanvasStore } from './store/useCanvasStore';

export default function App() {
  const selectedAppId = useCanvasStore((state) => state.selectedAppId);
  const appPanelOpen = useCanvasStore((state) => state.appPanelOpen);
  const graphErrorSimulated = useCanvasStore((state) => state.graphErrorSimulated);
  const toggleGraphError = useCanvasStore((state) => state.toggleGraphError);
  const appsQuery = useQuery({ queryKey: ['apps'], queryFn: fetchApps });
  const graphQuery = useQuery({
    queryKey: ['graph', selectedAppId, graphErrorSimulated],
    queryFn: () => {
      if (graphErrorSimulated) {
        throw new Error('Simulated graph failure');
      }
      return fetchGraph(selectedAppId);
    },
  });
  const selectedApp = appsQuery.data?.find((app) => app.id === selectedAppId);

  return (
    <div className="app">
      <TopBar selectedApp={selectedApp} />
      <LeftRail />
      {appPanelOpen ? <ApplicationPanel apps={appsQuery.data ?? []} isLoading={appsQuery.isLoading} /> : null}
      {graphQuery.isError ? (
        <div className="loading-state error-state">
          <span>Unable to load graph.</span>
          {graphErrorSimulated ? (
            <Button variant="default" onClick={toggleGraphError}>
              Restore canvas
            </Button>
          ) : null}
        </div>
      ) : graphQuery.isLoading || !graphQuery.data ? (
        <div className="loading-state">Loading canvas...</div>
      ) : (
        <CloudCanvas nodes={graphQuery.data.nodes} edges={graphQuery.data.edges} />
      )}
    </div>
  );
}
