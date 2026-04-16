import { ChevronDown } from 'lucide-react';
import { currentUser } from '../../data/mock/currentUser';

export function UserCard() {
  return (
    <div className="border-t border-ink-200 px-3 py-3">
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-ink-100"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink-200 bg-white text-xs font-medium text-ink-700">
          {currentUser.initials}
        </span>
        <div className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-sm font-medium text-ink-900">{currentUser.name}</span>
          <span className="truncate text-xs text-ink-500">
            {currentUser.role} · {currentUser.org.slice(0, 9)}…
          </span>
        </div>
        <ChevronDown size={12} className="text-ink-400" />
      </button>
    </div>
  );
}
