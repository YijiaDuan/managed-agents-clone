import { Clock, Cpu } from 'lucide-react';
import type { Session, TranscriptMessage } from '../../types/session';
import { cn } from '../../lib/cn';
import { formatDuration } from '../../lib/format';

interface Props {
  session: Session;
  selectedId: string | null;
  onSelect: (m: TranscriptMessage) => void;
}

export function TranscriptView({ session, selectedId, onSelect }: Props) {
  return (
    <div className="px-8 py-6">
      <div className="space-y-2">
        {session.transcript.map((m) => {
          const active = m.id === selectedId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect(m)}
              className={cn(
                'group flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left transition-colors',
                active
                  ? 'border-ink-300 bg-ink-50'
                  : 'border-transparent hover:border-ink-200 hover:bg-ink-50/60',
              )}
            >
              <span
                className={cn(
                  'mt-0.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium',
                  m.role === 'user' ? 'bg-pink-100 text-pink-700' : 'bg-orange-100 text-orange-800',
                )}
              >
                {m.role === 'user' ? 'User' : 'Agent'}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-ink-800">
                {m.content.split('\n')[0]}
              </span>
              {m.outputTokens ? (
                <span className="hidden items-center gap-1 text-[11px] text-ink-500 md:inline-flex">
                  <Cpu size={10} />
                  {(m.inputTokens ?? 0).toLocaleString()}/{(m.outputTokens).toLocaleString()}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-500">
                <Clock size={10} /> {m.timestamp}
              </span>
              {m.durationMs ? (
                <span className="hidden items-center gap-1 text-[11px] text-ink-500 md:inline-flex">
                  <Clock size={10} /> {formatDuration(m.durationMs)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
