import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
  Copy,
  Cpu,
  Download,
  FolderOpen,
  Keyboard,
  Search,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Dropdown } from '../../components/ui/Dropdown';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { UnderlineTabs } from '../../components/ui/UnderlineTabs';
import { getSession } from '../../data/mock/sessions';
import { formatDuration, formatRelativeTime, formatTokens } from '../../lib/format';
import { TranscriptView } from '../../components/session/TranscriptView';
import { DebugView } from '../../components/session/DebugView';
import { cn } from '../../lib/cn';
import type { TranscriptMessage, DebugEvent } from '../../types/session';

export function SessionDetailPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const session = sessionId ? getSession(sessionId) : undefined;
  const [view, setView] = useState<'transcript' | 'debug'>('transcript');
  const [selectedMessage, setSelectedMessage] = useState<TranscriptMessage | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<DebugEvent | null>(null);

  if (!session) {
    return (
      <div className="px-8 py-8">
        <p className="text-sm text-ink-500">Session not found.</p>
      </div>
    );
  }

  const shortId = session.id.length > 12 ? `sesn_…${session.id.slice(-6)}` : session.id;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-ink-200 bg-white px-8 pt-4 pb-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <Link to="/sessions" className="hover:text-ink-900">Sessions</Link>
            <span>/</span>
            <span className="font-mono text-xs">{shortId}</span>
            <button className="ml-1 inline-flex flex-col items-center text-ink-400 hover:text-ink-700" aria-label="prev/next">
              <ChevronUp size={10} />
              <ChevronDown size={10} className="-mt-0.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Dropdown
              trigger={
                <Button variant="secondary" rightIcon={<ChevronDown size={12} />}>
                  Actions
                </Button>
              }
              items={[
                { label: 'Send interrupt', icon: <Circle size={12} /> },
                { label: 'Send event…', icon: <Keyboard size={12} /> },
                { label: 'Archive session', icon: <X size={12} />, danger: true },
              ]}
            />
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-orange-100 px-3 text-sm font-medium text-orange-900 hover:bg-orange-200">
              <Sparkles size={13} />
              Ask Claude
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h1 className="font-mono text-xl font-semibold text-ink-900">{session.id}</h1>
          <StatusBadge status={session.status} />
          <span className="text-ink-300">·</span>
          <Link
            to={`/agents/${session.agentId}`}
            className="inline-flex items-center gap-1 text-sm text-ink-700 hover:text-ink-900"
          >
            <Share2 size={12} className="text-ink-500" /> {session.agentName}
          </Link>
          <span className="text-ink-300">·</span>
          <Link
            to={`/environments/${session.environmentId}`}
            className="inline-flex items-center gap-1 text-sm text-ink-700 hover:text-ink-900"
          >
            <FolderOpen size={12} className="text-ink-500" /> {session.environmentName}
          </Link>
          <span className="text-ink-300">·</span>
          <span className="inline-flex items-center gap-1 text-sm text-ink-700">
            <Clock size={12} className="text-ink-500" /> {formatDuration(session.durationMs)}
          </span>
          <span className="text-ink-300">·</span>
          <span className="inline-flex items-center gap-1 text-sm text-ink-700">
            <Cpu size={12} className="text-ink-500" /> {formatTokens(session.inputTokens)} / {formatTokens(session.outputTokens)}
          </span>
          <span className="text-ink-300">·</span>
          <span className="inline-flex items-center gap-1 text-sm text-ink-700">
            <Clock size={12} className="text-ink-500" /> {formatRelativeTime(session.createdAt)}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-ink-200 bg-white px-8 pt-2">
        <UnderlineTabs
          items={[
            { id: 'transcript', label: 'Transcript' },
            { id: 'debug', label: 'Debug' },
          ]}
          activeId={view}
          onChange={(id) => {
            setView(id as 'transcript' | 'debug');
            setSelectedMessage(null);
            setSelectedEvent(null);
          }}
          className="border-b-0"
        />
        <div className="flex flex-1 items-center gap-2 pb-2">
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 text-xs text-ink-700 hover:bg-ink-50"
          >
            All events <ChevronDown size={11} />
          </button>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100"
            aria-label="Search"
          >
            <Search size={13} />
          </button>

          <div className="ml-auto flex items-center gap-1 text-ink-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-ink-300" />
            <button className="rounded-md p-1 hover:bg-ink-100" aria-label="Keyboard"><Keyboard size={13} /></button>
            <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs hover:bg-ink-100">
              <Copy size={12} /> Copy all
            </button>
            <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs hover:bg-ink-100">
              <Download size={12} /> Download
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <div className={cn('flex flex-1 flex-col overflow-hidden bg-white', selectedMessage || selectedEvent ? 'border-r border-ink-200' : '')}>
          <Scrubber />
          <div className="flex-1 overflow-y-auto">
            {view === 'transcript' ? (
              <TranscriptView
                session={session}
                selectedId={selectedMessage?.id ?? null}
                onSelect={setSelectedMessage}
              />
            ) : (
              <DebugView
                session={session}
                selectedId={selectedEvent?.id ?? null}
                onSelect={setSelectedEvent}
              />
            )}
          </div>
        </div>
        {(selectedMessage || selectedEvent) && (
          <DetailPanel
            timestamp={selectedMessage?.timestamp ?? selectedEvent?.timestamp ?? ''}
            duration={selectedMessage?.durationMs ? formatDuration(selectedMessage.durationMs) : undefined}
            content={selectedMessage?.content ?? selectedEvent?.label ?? ''}
            payloadId={selectedEvent ? `sevt_…${selectedEvent.id.slice(-6)}` : undefined}
            onClose={() => {
              setSelectedMessage(null);
              setSelectedEvent(null);
            }}
            isMessage={!!selectedMessage}
            role={selectedMessage?.role}
            eventType={selectedEvent ? eventTypeLabel(selectedEvent.type) : undefined}
          />
        )}
      </div>
    </div>
  );
}

function eventTypeLabel(type: string) {
  if (type.startsWith('agent_')) return 'agent.message';
  if (type.startsWith('user_')) return 'user.message';
  if (type.startsWith('model_')) return 'model.request';
  if (type === 'thinking') return 'agent.thinking';
  if (type === 'session_idle') return 'session.idle';
  if (type === 'session_running') return 'session.running';
  return type;
}

function Scrubber() {
  return (
    <div className="border-b border-ink-200 bg-white px-8 pt-1 pb-3">
      <div className="relative h-4">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-ink-100" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-2/3 rounded-full bg-info-text" />
        <div className="absolute left-2/3 top-1/2 -translate-y-1/2 -ml-1.5 h-3 w-3 rounded-full border-2 border-white bg-info-text shadow" />
      </div>
    </div>
  );
}

interface DetailPanelProps {
  timestamp: string;
  duration?: string;
  content: string;
  payloadId?: string;
  onClose: () => void;
  isMessage: boolean;
  role?: 'user' | 'agent';
  eventType?: string;
}

function DetailPanel({ timestamp, duration, content, payloadId, onClose, isMessage, role, eventType }: DetailPanelProps) {
  return (
    <aside className="flex w-[440px] flex-col bg-white">
      <div className="flex items-center justify-between border-b border-ink-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <RolePill role={role ?? 'agent'} />
          <span className="text-sm font-medium text-ink-900">{isMessage ? 'Message' : (eventType ?? 'Event')}</span>
        </div>
        <button onClick={onClose} className="rounded-md p-1 text-ink-400 hover:bg-ink-100" aria-label="Close">
          <X size={14} />
        </button>
      </div>
      <div className="border-b border-ink-100 px-4 py-2 text-xs text-ink-500">
        <span className="mr-3 inline-flex items-center gap-1"><Clock size={11} />{timestamp}</span>
        {duration ? (
          <span className="inline-flex items-center gap-1"><Clock size={11} />{duration}</span>
        ) : null}
      </div>
      {payloadId ? (
        <div className="border-b border-ink-100 px-4 py-2 font-mono text-xs text-ink-500">{payloadId}</div>
      ) : null}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isMessage ? (
          <>
            <p className="mb-2 text-xs font-medium text-ink-500">Content</p>
            <div className="prose-sm space-y-3 text-sm leading-relaxed text-ink-800">
              {content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) {
                  return <h2 key={i} className="text-base font-semibold text-ink-900">{line.slice(2)}</h2>;
                }
                if (line.trim() === '') return <div key={i} className="h-1" />;
                return <p key={i} className="whitespace-pre-wrap">{line}</p>;
              })}
            </div>
          </>
        ) : (
          <>
            <p className="mb-2 text-xs font-medium text-ink-500">{eventType ?? 'event'}</p>
            <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap rounded-md bg-ink-50 p-3 font-mono text-[11px] leading-relaxed text-ink-800">
{`{
  "content": [
    {
      "text": "${content.replace(/"/g, '\\"').slice(0, 800)}…"
    }
  ]
}`}
            </pre>
          </>
        )}
      </div>
    </aside>
  );
}

function RolePill({ role }: { role: 'user' | 'agent' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium',
        role === 'user' ? 'bg-pink-100 text-pink-700' : 'bg-orange-100 text-orange-800',
      )}
    >
      {role === 'user' ? 'User' : 'Agent'}
    </span>
  );
}
