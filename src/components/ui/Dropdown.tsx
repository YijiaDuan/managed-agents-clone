import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface DropdownItem {
  label: ReactNode;
  onClick?: () => void;
  danger?: boolean;
  icon?: ReactNode;
}

interface Props {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  fullWidth?: boolean;
}

export function Dropdown({ trigger, items, align = 'right', fullWidth = false }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div ref={ref} className={cn('relative', fullWidth ? 'block w-full' : 'inline-block')}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open ? (
        <div
          className={cn(
            'absolute z-40 mt-1 min-w-[180px] rounded-md border border-ink-200 bg-white py-1 shadow-modal',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                it.onClick?.();
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-ink-50',
                it.danger ? 'text-danger-text' : 'text-ink-800',
              )}
            >
              {it.icon}
              {it.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
