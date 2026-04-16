import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Boxes,
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
  X,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Dropdown } from '../../components/ui/Dropdown';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Tabs } from '../../components/ui/Tabs';
import { PageContainer } from '../../components/page/PageContainer';
import { getSession } from '../../data/mock/sessions';
import { formatDuration, formatRelativeTime, formatTokens } from '../../lib/format';
import { TranscriptView } from '../../components/session/TranscriptView';
import { DebugView } from '../../components/session/DebugView';
import { cn } from '../../lib/cn';
import type { TranscriptMessage } from '../../types/session';
import type { DebugEvent } from '../../types/session';

export function SessionDetailPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const session = sessionId ? getSession(sessionId) : undefined;
  const [view, setView] = useState<'transcript' | 'debug'>('transcript');
  const [selectedMessage, setSelectedMessage] = useState<TranscriptMessage | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<DebugEvent | null>(null);

  if (!session) {
    return (
      <PageContainer>
        <p className="text-sm text-ink-500">Session not found.</p>
      </PageContainer>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header bar */}
      <div className="border-b border-ink-200 bg-white px-8 py-4">
        <div className="mb-2 text-sm text-ink-500">
          <Link to="/sessions" className="hover:text-ink-900">Sessions</Link>
          <span className="mx-1">/</span>
          <span className="font-mono text-xs">{session.id.slice(0, 12)}…</span>
          <button className="ml-1 inline-flex items-center text-ink-400 hover:text-ink-700" aria-label="prev/next">
            <ChevronUp size={12} />
            <ChevronDown size={12} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-mono text-xl font-semibold text-ink-900">{session.id}</h1>
              <StatusBadge status={session.status} />
              <span className="text-ink-300">·</span>
              <Link
                to={`/agents/${session.agentId}`}
                className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-0.5 text-xs text-ink-800 hover:bg-ink-50"
              >
                <Boxes size={11} className="text-ink-500" /> {session.agentName}
              </Link>
              <span className="text-ink-300">·</span>
              <Link
                to={`/environments/${session.environmentId}`}
                className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-0.5 text-xs text-ink-800 hover:bg-ink-50"
              >
                <FolderOpen size={11} className="text-ink-500" /> {session.environmentName}
              </Link>
              <span className="text-ink-300">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-ink-600">
                <Clock size={11} className="text-ink-500" /> {formatDuration(session.durationMs)}
              </span>
              <span className="text-ink-300">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-ink-600">
                <Cpu size={11} className="text-ink-500" /> {formatTokens(session.inputTokens)}/{formatTokens(session.outputTokens)}
              </span>
              <span className="text-ink-300">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-ink-600">
                <Clock size={11} className="text-ink-500" /> {formatRelativeTime(session.createdAt)}
              </span>
            </div>
          </div>

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
          <button className="ml-1 inline-flex h-9 items-center gap-1 rounded-md bg-orange-100 px-3 text-sm font-medium text-orange-900 hover:bg-orange-200">
            <span className="inline-flex h-3 w-3 items-center justify-center">✦</span>
            Ask Claude
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-ink-200 bg-white px-8 py-2.5">
        <Tabs
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
        />
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 text-xs text-ink-700 hover:bg-ink-50"
        >
          All events <ChevronDown size={11} />
        </button>
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink-200 bg-white text-ink-500 hover:bg-ink-50"
          aria-label="Search"
        >
          <Search size={12} />
        </button>

        <div className="ml-auto flex items-center gap-2 text-ink-500">
          <span className="inline-flex h-2 w-2 rounded-full bg-ink-300" />
          <button className="rounded-md p-1 hover:bg-ink-100" aria-label="Keyboard">
            <Keyboard size={14} />
          </button>
          <button className="inline-flex items-center gap-1 rounded-md p-1 px-2 text-xs hover:bg-ink-100">
            <Copy size={12} /> Copy all
          </button>
          <button className="inline-flex items-center gap-1 rounded-md p-1 px-2 text-xs hover:bg-ink-100">
            <Download size={12} /> Download
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <div className={cn('flex-1 overflow-y-auto bg-white', selectedMessage || selectedEvent ? 'border-r border-ink-200' : '')}>
          <ProgressBar />
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
        {(selectedMessage || selectedEvent) && (
          <DetailPanel
            title={selectedMessage ? 'Message' : 'agent.message'}
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
          />
        )}
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="px-8 pt-4">
      <div className="h-2 w-full rounded-md bg-ink-100">
        <div className="h-full w-2/3 rounded-md bg-info-text" />
      </div>
    </div>
  );
}

interface DetailPanelProps {
  title: string;
  timestamp: string;
  duration?: string;
  content: string;
  payloadId?: string;
  onClose: () => void;
  isMessage: boolean;
  role?: 'user' | 'agent';
}

function DetailPanel({ title, timestamp, duration, content, payloadId, onClose, isMessage, role }: DetailPanelProps) {
  return (
    <aside className="flex w-[420px] flex-col bg-white">
      <div className="flex items-center justify-between border-b border-ink-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={cn(
            'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium',
            role === 'user' ? 'bg-pink-100 text-pink-700' : 'bg-orange-100 text-orange-800',
          )}>
            {role === 'user' ? 'User' : 'Agent'}
          </span>
          <span className="text-sm font-medium text-ink-900">{title}</span>
        </div>
        <button onClick={onClose} className="rounded-md p-1 text-ink-400 hover:bg-ink-100" aria-label="Close">
          <X size={14} />
        </button>
      </div>
      <div className="border-b border-ink-100 px-4 py-2 text-xs text-ink-500">
        <span className="mr-3"><Clock size={11} className="-mt-0.5 mr-1 inline" />{timestamp}</span>
        {duration ? (
          <span><Clock size={11} className="-mt-0.5 mr-1 inline" />{duration}</span>
        ) : null}
      </div>
      {payloadId ? (
        <div className="px-4 py-2 font-mono text-xs text-ink-500">{payloadId}</div>
      ) : null}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isMessage ? (
          <div className="space-y-2 text-sm leading-relaxed text-ink-800">
            {content.split('\n').map((line, i) =>
              line.startsWith('# ') ? (
                <h2 key={i} className="text-lg font-semibold text-ink-900">{line.slice(2)}</h2>
              ) : line.trim() === '' ? (
                <div key={i} className="h-2" />
              ) : (
                <p key={i}>{line}</p>
              ),
            )}
          </div>
        ) : (
          <div>
            <p className="mb-1 text-xs text-ink-500">agent.message</p>
            <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap rounded-md bg-ink-50 p-3 font-mono text-xs leading-relaxed text-ink-800">
              {`{
  "content": [
    {
      "text": "${content.replace(/"/g, '\\"').slice(0, 500)}…"
    }
  ]
}`}
            </pre>
          </div>
        )}
      </div>
    </aside>
  );
}
