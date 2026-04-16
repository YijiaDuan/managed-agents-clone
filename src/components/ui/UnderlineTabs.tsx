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

export function UnderlineTabs({ items, activeId, onChange, className }: Props) {
  return (
    <div className={cn('flex items-center gap-6 border-b border-ink-200', className)}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              '-mb-px border-b-2 pb-2.5 pt-1 text-sm transition-colors',
              active
                ? 'border-ink-900 font-medium text-ink-900'
                : 'border-transparent text-ink-500 hover:text-ink-800',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
