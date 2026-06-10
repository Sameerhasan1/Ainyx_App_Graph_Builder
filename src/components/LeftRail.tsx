import { Boxes, Cuboid, Database, Github, Network, Server, SquareStack } from 'lucide-react';

const railItems = [
  { label: 'GitHub', icon: Github, active: true },
  { label: 'Postgres', icon: Database },
  { label: 'Redis', icon: SquareStack },
  { label: 'MongoDB', icon: Server },
  { label: 'Containers', icon: Cuboid },
  { label: 'Storage', icon: Boxes },
  { label: 'Network', icon: Network },
];

export function LeftRail() {
  return (
    <aside className="left-rail" aria-label="Service navigation">
      {railItems.map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.label} type="button" className={item.active ? 'rail-item active' : 'rail-item'} title={item.label}>
            <Icon size={26} />
          </button>
        );
      })}
    </aside>
  );
}
