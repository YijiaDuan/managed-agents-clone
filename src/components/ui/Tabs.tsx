import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface TabItem {
  id: string;
  label: ReactNode;
}

interface Props {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeId, onChange, className }: Props) {
  return (
    <div className={cn('inline-flex items-center rounded-md border border-ink-200 bg-white p-0.5', className)}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              'rounded-[5px] px-3 py-1 text-xs font-medium transition-colors',
              active ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:bg-ink-50',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
