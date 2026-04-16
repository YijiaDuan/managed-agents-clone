import type { Status } from '../../types/shared';
import { cn } from '../../lib/cn';

interface Props {
  status: Status;
}

const styles: Record<Status, string> = {
  active: 'bg-success-bg text-success-text',
  idle: 'bg-ink-100 text-ink-600',
  running: 'bg-info-bg text-info-text',
  archived: 'bg-ink-100 text-ink-500',
  error: 'bg-danger-bg text-danger-text',
};

export function StatusBadge({ status }: Props) {
  const label = status[0].toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium',
        styles[status],
      )}
    >
      {label}
    </span>
  );
}
