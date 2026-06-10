import { AlertTriangle, Crosshair, PanelRightOpen, Trash2 } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { useCanvasStore } from '../store/useCanvasStore';
import { Button } from './ui/button';

interface CanvasToolbarProps {
  onDeleteSelection: () => void;
}

export function CanvasToolbar({ onDeleteSelection }: CanvasToolbarProps) {
  const { fitView } = useReactFlow();
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);
  const setMobileInspectorOpen = useCanvasStore((state) => state.setMobileInspectorOpen);
  const graphErrorSimulated = useCanvasStore((state) => state.graphErrorSimulated);
  const toggleGraphError = useCanvasStore((state) => state.toggleGraphError);

  return (
    <div className="canvas-toolbar">
      <Button variant="icon" aria-label="Fit view" onClick={() => fitView({ padding: 0.2, duration: 500 })}>
        <Crosshair size={18} />
      </Button>
      <Button variant="icon" aria-label="Delete selected item" onClick={onDeleteSelection}>
        <Trash2 size={18} />
      </Button>
      <Button
        variant="icon"
        className={graphErrorSimulated ? 'danger-active' : undefined}
        aria-label={graphErrorSimulated ? 'Clear simulated error' : 'Simulate graph error'}
        onClick={toggleGraphError}
      >
        <AlertTriangle size={18} />
      </Button>
      <Button
        variant="icon"
        className="mobile-only"
        aria-label="Open inspector"
        disabled={!selectedNodeId}
        onClick={() => setMobileInspectorOpen(true)}
      >
        <PanelRightOpen size={18} />
      </Button>
    </div>
  );
}
