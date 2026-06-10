import { ChevronDown, MoreHorizontal, Moon, Share2, Sun } from 'lucide-react';
import type { CloudApp } from '../types/cloud';
import { useCanvasStore } from '../store/useCanvasStore';
import { Button } from './ui/button';
import { ServiceIcon } from './ServiceIcon';

interface TopBarProps {
  selectedApp?: CloudApp;
}

export function TopBar({ selectedApp }: TopBarProps) {
  const appPanelOpen = useCanvasStore((state) => state.appPanelOpen);
  const toggleAppPanel = useCanvasStore((state) => state.toggleAppPanel);

  return (
    <header className="top-bar">
      <div className="brand-lockup">
        <div className="logo-mark" aria-hidden="true" />
        <ServiceIcon kind={selectedApp?.icon ?? 'app'} color={selectedApp?.color ?? '#5b5ce8'} />
        <strong>{selectedApp?.name ?? 'supertokens-golang'}</strong>
        <button
          type="button"
          className={appPanelOpen ? 'top-chevron open' : 'top-chevron'}
          aria-label={appPanelOpen ? 'Close applications' : 'Open applications'}
          aria-expanded={appPanelOpen}
          onClick={toggleAppPanel}
        >
          <ChevronDown size={18} />
        </button>
        <MoreHorizontal size={22} />
      </div>
      <div className="top-actions">
        <Button variant="icon" aria-label="Share canvas">
          <Share2 size={18} />
        </Button>
        <Button variant="icon" className="is-active" aria-label="Dark theme">
          <Moon size={18} />
        </Button>
        <Button variant="icon" aria-label="Light theme">
          <Sun size={18} />
        </Button>
        <div className="avatar" aria-label="User avatar" />
      </div>
    </header>
  );
}
