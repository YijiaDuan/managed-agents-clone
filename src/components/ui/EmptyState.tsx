import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
      {icon ? <div className="mb-3 text-ink-400">{icon}</div> : null}
      <p className="text-sm font-medium text-ink-900">{title}</p>
      {description ? (
        <p className="mt-1 max-w-md text-sm text-ink-500">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
