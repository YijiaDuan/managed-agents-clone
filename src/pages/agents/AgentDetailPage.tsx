import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Copy, MoreVertical, Pencil, Wrench } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CopyableId } from '../../components/ui/CopyableId';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { UnderlineTabs } from '../../components/ui/UnderlineTabs';
import { Dropdown } from '../../components/ui/Dropdown';
import { Archive, Trash } from 'lucide-react';
import { toast } from '../../components/ui/Toast';
import { DataTable, type Column } from '../../components/table/DataTable';
import { Pagination } from '../../components/table/Pagination';
import { PageContainer } from '../../components/page/PageContainer';
import { CreatedFilter, ShowArchivedToggle, VersionFilter } from '../../components/page/Filters';
import { getAgent } from '../../data/mock/agents';
import { getSessionsForAgent } from '../../data/mock/sessions';
import { formatRelativeTime } from '../../lib/format';
import { formatAbsoluteShort } from '../../lib/format';
import type { Session } from '../../types/session';

function versionsUpTo(current: string): string[] {
  const all = ['v1', 'v2', 'v3', 'v4', 'v5'];
  const idx = all.indexOf(current);
  return idx === -1 ? [current] : all.slice(0, idx + 1);
}

export function AgentDetailPage() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const agent = agentId ? getAgent(agentId) : undefined;
  const [tab, setTab] = useState<'agent' | 'sessions'>('agent');
  const [showArchived, setShowArchived] = useState(true);

  if (!agent) {
    return (
      <PageContainer>
        <p className="text-sm text-ink-500">Agent not found.</p>
      </PageContainer>
    );
  }

  const sessions = getSessionsForAgent(agent.id);

  const sessionColumns: Column<Session>[] = [
    { key: 'id', header: 'ID', render: (s) => <CopyableId id={s.id} /> },
    { key: 'name', header: 'Name', render: () => <span className="text-ink-700">—</span> },
    { key: 'status', header: 'Status', render: (s) => <StatusBadge status={s.status} /> },
    { key: 'version', header: 'Version', render: (s) => <span className="text-xs text-ink-700">{s.version}</span> },
    { key: 'created', header: 'Created', render: (s) => <span className="text-xs text-ink-600">{formatAbsoluteShort(s.createdAt)}</span> },
  ];

  return (
    <PageContainer>
      <div className="mb-2 text-sm text-ink-500">
        <Link to="/agents" className="hover:text-ink-900">Agents</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-900">{agent.name}</span>
      </div>

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-ink-900">{agent.name}</h1>
            <StatusBadge status={agent.status} />
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <CopyableId id={agent.id} full />
            <span className="text-ink-300">·</span>
            <span>Last updated {formatRelativeTime(agent.updatedAt)}</span>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-ink-700">{agent.description}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="secondary" leftIcon={<Pencil size={13} />} onClick={() => toast('Edit not implemented in this demo')}>Edit</Button>
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100"
                aria-label="More actions"
              >
                <MoreVertical size={16} />
              </button>
            }
            items={[
              { label: 'Archive', icon: <Archive size={13} />, onClick: () => toast('Archived (mock)') },
              { label: 'Delete', icon: <Trash size={13} />, onClick: () => toast('Deleted (mock)'), danger: true },
            ]}
          />
        </div>
      </div>

      <UnderlineTabs
        items={[
          { id: 'agent', label: 'Agent' },
          { id: 'sessions', label: 'Sessions' },
        ]}
        activeId={tab}
        onChange={(id) => setTab(id as 'agent' | 'sessions')}
        className="mb-6"
      />

      {tab === 'agent' ? (
        <div className="space-y-6">
          <Dropdown
            align="left"
            fullWidth
            trigger={
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md border border-ink-200 bg-white px-4 py-3 text-left hover:bg-ink-50"
              >
                <div className="flex items-center gap-2 text-sm text-ink-700">
                  <span className="font-medium text-ink-700">Version:</span>
                  <span className="text-ink-900">{agent.version}</span>
                </div>
                <ChevronDown size={14} className="text-ink-400" />
              </button>
            }
            items={versionsUpTo(agent.version).map((v) => ({
              label: v + (v === agent.version ? '  · current' : ''),
              onClick: () => toast(`Pinned to ${v} (mock)`),
            }))}
          />

          <div>
            <p className="mb-1 text-sm font-medium text-ink-900">Model</p>
            <p className="font-mono text-sm text-ink-700">{agent.model}</p>
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-ink-900">System prompt</p>
            <div className="relative rounded-md border border-ink-200 bg-white px-4 py-3.5">
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(agent.systemPrompt);
                  toast('System prompt copied');
                }}
                className="absolute right-3 top-3 rounded-md p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                aria-label="Copy"
              >
                <Copy size={13} />
              </button>
              <p className="whitespace-pre-wrap pr-6 text-sm leading-relaxed text-ink-800">{agent.systemPrompt}</p>
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-ink-900">MCPs and tools</p>
            <div className="rounded-md border border-ink-200 bg-white">
              <button
                type="button"
                onClick={() => toast('Tool permissions panel (mock)')}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm hover:bg-ink-50"
              >
                <div className="flex items-center gap-2">
                  <Wrench size={14} className="text-ink-500" />
                  <span className="font-medium text-ink-900">Built-in tools</span>
                  <span className="font-mono text-xs text-ink-500">
                    {agent.tools[0]?.name ?? 'agent_toolset_20260401'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-ink-500">
                  <span>Tool permissions <span className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-ink-100 text-[10px]">{agent.tools.length}</span></span>
                  <span>Always allow</span>
                  <ChevronDown size={12} />
                </div>
              </button>
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-ink-900">Skills</p>
            <p className="text-sm text-ink-500">No skills configured.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center gap-2">
            <CreatedFilter />
            <VersionFilter />
            <div className="ml-auto">
              <ShowArchivedToggle value={showArchived} onChange={setShowArchived} />
            </div>
          </div>
          <DataTable
            columns={sessionColumns}
            data={sessions}
            rowKey={(s) => s.id}
            onRowClick={(s) => navigate(`/sessions/${s.id}`)}
          />
          <Pagination />
        </>
      )}
    </PageContainer>
  );
}
