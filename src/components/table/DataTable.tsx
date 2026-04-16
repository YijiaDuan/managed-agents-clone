import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface Column<T> {
  key: string;
  header: ReactNode;
  width?: string;
  render: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyState?: ReactNode;
  className?: string;
}

export function DataTable<T>({ columns, data, rowKey, onRowClick, emptyState, className }: Props<T>) {
  if (data.length === 0 && emptyState) return <>{emptyState}</>;

  return (
    <div className={cn('overflow-hidden rounded-lg border border-ink-200 bg-white shadow-card', className)}>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200 bg-ink-50">
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  'px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-ink-500',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'border-b border-ink-100 last:border-b-0',
                onRowClick && 'cursor-pointer hover:bg-ink-50',
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-ink-800',
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                  )}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
