import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Copy, Pencil, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CopyableId } from '../../components/ui/CopyableId';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Tabs } from '../../components/ui/Tabs';
import { DataTable, type Column } from '../../components/table/DataTable';
import { Pagination } from '../../components/table/Pagination';
import { PageContainer } from '../../components/page/PageContainer';
import { CreatedFilter, ShowArchivedToggle, VersionFilter } from '../../components/page/Filters';
import { getAgent } from '../../data/mock/agents';
import { getSessionsForAgent } from '../../data/mock/sessions';
import { formatRelativeTime } from '../../lib/format';
import { formatAbsoluteShort } from '../../lib/format';
import type { Session } from '../../types/session';

export function AgentDetailPage() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const agent = agentId ? getAgent(agentId) : undefined;
  const [tab, setTab] = useState<'agent' | 'sessions'>('agent');

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
    { key: 'name', header: 'Name', render: (s) => <span className="text-ink-700">—</span> },
    { key: 'status', header: 'Status', render: (s) => <StatusBadge status={s.status} /> },
    { key: 'version', header: 'Version', render: (s) => <span className="text-xs text-ink-700">{s.version}</span> },
    { key: 'created', header: 'Created', render: (s) => <span className="text-xs text-ink-600">{formatAbsoluteShort(s.createdAt)}</span> },
  ];

  return (
    <PageContainer>
      {/* Breadcrumbs */}
      <div className="mb-2 text-sm text-ink-500">
        <Link to="/agents" className="hover:text-ink-900">Agents</Link>
        <span className="mx-1">/</span>
        <span className="text-ink-900">{agent.name}</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-ink-900">{agent.name}</h1>
            <StatusBadge status={agent.status} />
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-ink-500">
            <CopyableId id={agent.id} full />
            <span className="text-ink-300">·</span>
            <span>Last updated {formatRelativeTime(agent.updatedAt)}</span>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-ink-700">{agent.description}</p>
        </div>
        <Button variant="secondary" leftIcon={<Pencil size={14} />}>Edit</Button>
      </div>

      <div className="mb-4">
        <Tabs
          items={[
            { id: 'agent', label: 'Agent' },
            { id: 'sessions', label: 'Sessions' },
          ]}
          activeId={tab}
          onChange={(id) => setTab(id as 'agent' | 'sessions')}
        />
      </div>

      {tab === 'agent' ? (
        <div className="space-y-5">
          <Card className="px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-ink-500">Version: </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-ink-200 px-2 py-0.5 text-xs text-ink-800 hover:bg-ink-50"
              >
                {agent.version} <ChevronDown size={11} />
              </button>
            </div>
          </Card>

          <Card className="px-5 py-4">
            <p className="text-xs font-medium text-ink-500">Model</p>
            <p className="mt-1 font-mono text-sm text-ink-900">{agent.model}</p>
          </Card>

          <Card className="px-5 py-4">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-medium text-ink-500">System prompt</p>
              <button
                type="button"
                className="rounded-md p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                aria-label="Copy"
              >
                <Copy size={14} />
              </button>
            </div>
            <p className="text-sm leading-relaxed text-ink-800">{agent.systemPrompt}</p>
          </Card>

          <Card className="px-5 py-4">
            <p className="text-xs font-medium text-ink-500">MCPs and tools</p>
            <div className="mt-3 rounded-md border border-ink-200 bg-ink-50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-ink-800">
                  <Sparkles size={14} className="text-ink-500" />
                  <span className="font-medium">Built-in tools</span>
                  <span className="ml-1 font-mono text-xs text-ink-500">{agent.tools[0]?.name ?? 'agent_toolset_20260401'}</span>
                </div>
                <span className="text-xs text-ink-500">Always allow</span>
              </div>
              <div className="mt-2 text-xs text-ink-500">Tool permissions: {agent.tools.length}</div>
            </div>
          </Card>

          <Card className="px-5 py-4">
            <p className="text-xs font-medium text-ink-500">Skills</p>
            <p className="mt-2 text-sm text-ink-500">No skills configured.</p>
          </Card>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center gap-2">
            <CreatedFilter />
            <VersionFilter />
            <div className="ml-auto">
              <ShowArchivedToggle value />
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
