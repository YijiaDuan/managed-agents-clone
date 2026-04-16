import { MoreVertical } from 'lucide-react';

export function RowMenu() {
  return (
    <button
      type="button"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100"
      aria-label="More actions"
    >
      <MoreVertical size={14} />
    </button>
  );
}
