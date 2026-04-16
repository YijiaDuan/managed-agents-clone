import {
  AlertTriangle,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  MessageCircle,
  PlayCircle,
  StopCircle,
  Terminal,
  User,
} from 'lucide-react';
import type { DebugEvent, DebugEventType, Session } from '../../types/session';
import { cn } from '../../lib/cn';

interface Props {
  session: Session;
  selectedId: string | null;
  onSelect: (e: DebugEvent) => void;
}

const labelMap: Record<DebugEventType, { label: string; tone: string; icon: React.ReactNode }> = {
  session_running: { label: 'Running', tone: 'bg-info-bg text-info-text', icon: <PlayCircle size={11} /> },
  user_message: { label: 'User', tone: 'bg-pink-100 text-pink-700', icon: <User size={11} /> },
  model_request_start: { label: 'Model', tone: 'bg-purple-100 text-purple-700', icon: <Cpu size={11} /> },
  model_request_end: { label: 'Model', tone: 'bg-purple-100 text-purple-700', icon: <Cpu size={11} /> },
  thinking: { label: 'Thinking', tone: 'bg-purple-100 text-purple-700', icon: <Brain size={11} /> },
  tool_use: { label: 'Tool', tone: 'bg-amber-100 text-amber-800', icon: <Terminal size={11} /> },
  tool_result: { label: 'Tool', tone: 'bg-amber-100 text-amber-800', icon: <CheckCircle2 size={11} /> },
  agent_message: { label: 'Agent', tone: 'bg-orange-100 text-orange-800', icon: <Bot size={11} /> },
  session_idle: { label: 'Idle', tone: 'bg-ink-100 text-ink-600', icon: <StopCircle size={11} /> },
  session_error: { label: 'Error', tone: 'bg-danger-bg text-danger-text', icon: <AlertTriangle size={11} /> },
};

export function DebugView({ session, selectedId, onSelect }: Props) {
  return (
    <div className="px-8 py-6">
      <div className="overflow-hidden rounded-lg border border-ink-200">
        {session.events.map((ev, i) => {
          const meta = labelMap[ev.type];
          const active = ev.id === selectedId;
          return (
            <button
              key={ev.id}
              type="button"
              onClick={() => onSelect(ev)}
              className={cn(
                'group flex w-full items-center gap-3 border-b border-ink-100 px-3 py-2 text-left last:border-b-0 transition-colors',
                active ? 'bg-ink-50' : i % 2 === 0 ? 'bg-white hover:bg-ink-50/60' : 'bg-ink-50/40 hover:bg-ink-50',
              )}
            >
              <span className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium', meta.tone)}>
                {meta.icon}
                {meta.label}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-ink-800">
                {ev.label}
              </span>
              <span className="ml-auto font-mono text-[11px] text-ink-500">{ev.timestamp}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-md bg-ink-50 px-3 py-2 text-xs text-ink-500">
        <MessageCircle size={12} /> Showing {session.events.length} events. Click a row to inspect the payload.
      </div>
    </div>
  );
}
