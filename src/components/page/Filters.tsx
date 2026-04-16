import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

export function CreatedFilter() {
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 text-xs text-ink-700 hover:bg-ink-50"
    >
      Created <span className="text-ink-500">All time</span>
      <ChevronDown size={12} />
    </button>
  );
}

export function VersionFilter() {
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 text-xs text-ink-700 hover:bg-ink-50"
    >
      Version <span className="text-ink-500">All</span>
      <ChevronDown size={12} />
    </button>
  );
}

export function AgentFilter() {
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 text-xs text-ink-700 hover:bg-ink-50"
    >
      Agent <span className="text-ink-500">All</span>
      <ChevronDown size={12} />
    </button>
  );
}

export function GoToIdInput({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <div className={cn('relative h-8', className)}>
      <ArrowRight
        size={12}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="h-8 w-64 rounded-md border border-ink-200 bg-white pl-7 pr-2.5 text-xs text-ink-700 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-200"
      />
    </div>
  );
}

export function ShowArchivedToggle({ value = false }: { value?: boolean }) {
  return (
    <label className="inline-flex select-none items-center gap-2 text-xs text-ink-700">
      Show archived
      <span
        className={cn(
          'inline-flex h-4 w-7 items-center rounded-full transition-colors',
          value ? 'bg-success-text' : 'bg-ink-200',
        )}
      >
        <span
          className={cn(
            'inline-block h-3 w-3 transform rounded-full bg-white transition-transform',
            value ? 'translate-x-3.5' : 'translate-x-0.5',
          )}
        />
      </span>
    </label>
  );
}
