import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TabsProps<T extends string> {
  items: Array<{ value: T; label: string; icon?: ReactNode }>;
  value: T;
  onValueChange: (value: T) => void;
}

export function Tabs<T extends string>({ items, value, onValueChange }: TabsProps<T>) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === value}
          className={cn('tab', item.value === value && 'tab-active')}
          onClick={() => onValueChange(item.value)}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
