import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

function FilterChip({ label, value }: { label: string; value: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center gap-2 rounded-md border border-ink-200 bg-white px-3 text-sm hover:bg-ink-50"
    >
      <span className="font-medium text-ink-800">{label}</span>
      <span className="text-ink-500">{value}</span>
      <ChevronDown size={12} className="text-ink-400" />
    </button>
  );
}

export function CreatedFilter() {
  return <FilterChip label="Created" value="All time" />;
}

export function VersionFilter() {
  return <FilterChip label="Version" value="All" />;
}

export function AgentFilter() {
  return <FilterChip label="Agent" value="All" />;
}

export function GoToIdInput({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <div className={cn('relative h-9', className)}>
      <ArrowRight
        size={13}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="h-9 w-72 rounded-md border border-ink-200 bg-white pl-8 pr-3 text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-200"
      />
    </div>
  );
}

export function ShowArchivedToggle({ value = false }: { value?: boolean }) {
  return (
    <label className="inline-flex select-none items-center gap-2 text-sm text-ink-700">
      Show archived
      <span
        className={cn(
          'inline-flex h-4 w-7 items-center rounded-full transition-colors',
          value ? 'bg-ink-800' : 'bg-ink-200',
        )}
      >
        <span
          className={cn(
            'inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform',
            value ? 'translate-x-3.5' : 'translate-x-0.5',
          )}
        />
      </span>
    </label>
  );
}
