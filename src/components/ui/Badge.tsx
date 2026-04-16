import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'active' | 'idle' | 'archived' | 'running' | 'error' | 'neutral';

const toneClasses: Record<Tone, string> = {
  active: 'bg-success-bg text-success-text',
  idle: 'bg-ink-100 text-ink-700',
  archived: 'bg-ink-100 text-ink-500',
  running: 'bg-info-bg text-info-text',
  error: 'bg-danger-bg text-danger-text',
  neutral: 'bg-ink-100 text-ink-700',
};

interface Props {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = 'neutral', children, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium capitalize',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
