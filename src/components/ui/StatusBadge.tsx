import type { Status } from '../../types/shared';
import { Badge } from './Badge';

interface Props {
  status: Status;
}

export function StatusBadge({ status }: Props) {
  const tone = status === 'active'
    ? 'active'
    : status === 'idle'
      ? 'idle'
      : status === 'running'
        ? 'running'
        : status === 'archived'
          ? 'archived'
          : 'error';
  return <Badge tone={tone}>{status[0].toUpperCase() + status.slice(1)}</Badge>;
}
