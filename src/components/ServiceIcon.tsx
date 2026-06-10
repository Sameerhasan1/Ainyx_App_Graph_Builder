import { Leaf, Lightbulb, Puzzle, Rocket } from 'lucide-react';
import type { ServiceKind } from '../types/cloud';

interface ServiceIconProps {
  kind: ServiceKind;
  color?: string;
}

export function ServiceIcon({ kind, color }: ServiceIconProps) {
  if (kind === 'postgres') {
    return <span className="brand-icon postgres">PG</span>;
  }
  if (kind === 'redis') {
    return <span className="brand-icon redis">RD</span>;
  }
  if (kind === 'mongodb') {
    return <span className="brand-icon mongodb"><Leaf size={18} fill="currentColor" /></span>;
  }

  const iconStyle = color ? { background: color } : undefined;
  const Icon = kind === 'app' ? Lightbulb : kind === 'worker' ? Puzzle : Rocket;

  return (
    <span className="app-icon" style={iconStyle}>
      <Icon size={22} />
    </span>
  );
}
