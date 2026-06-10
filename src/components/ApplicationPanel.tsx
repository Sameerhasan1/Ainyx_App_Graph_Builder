import { ChevronRight, Plus, Search } from 'lucide-react';
import type { CloudApp } from '../types/cloud';
import { useCanvasStore } from '../store/useCanvasStore';
import { ServiceIcon } from './ServiceIcon';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ApplicationPanelProps {
  apps: CloudApp[];
  isLoading: boolean;
}

export function ApplicationPanel({ apps, isLoading }: ApplicationPanelProps) {
  const selectedAppId = useCanvasStore((state) => state.selectedAppId);
  const setSelectedAppId = useCanvasStore((state) => state.setSelectedAppId);

  return (
    <section className="application-panel" aria-label="Applications">
      <h1>Application</h1>
      <div className="search-row">
        <div className="search-shell">
          <Input placeholder="Search..." aria-label="Search applications" />
          <Search size={22} />
        </div>
        <Button variant="icon" className="add-button" aria-label="Add application">
          <Plus size={24} />
        </Button>
      </div>
      <div className="app-list">
        {isLoading ? (
          <p className="muted">Loading apps...</p>
        ) : (
          apps.map((app) => (
            <button
              key={app.id}
              type="button"
              className={app.id === selectedAppId ? 'app-row selected' : 'app-row'}
              onClick={() => setSelectedAppId(app.id)}
            >
              <ServiceIcon kind={app.icon} color={app.color} />
              <span>{app.name}</span>
              <ChevronRight size={20} />
            </button>
          ))
        )}
      </div>
    </section>
  );
}
