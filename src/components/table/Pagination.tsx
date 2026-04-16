import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination() {
  return (
    <div className="mt-3 flex items-center gap-1">
      <button
        type="button"
        disabled
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink-200 text-ink-400 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={14} />
      </button>
      <button
        type="button"
        disabled
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink-200 text-ink-400 disabled:cursor-not-allowed"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
