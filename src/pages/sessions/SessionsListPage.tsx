import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Share2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CopyableId } from '../../components/ui/CopyableId';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DataTable, type Column } from '../../components/table/DataTable';
import { Pagination } from '../../components/table/Pagination';
import { PageContainer } from '../../components/page/PageContainer';
import { PageHeader } from '../../components/page/PageHeader';
import { AgentFilter, CreatedFilter, GoToIdInput, ShowArchivedToggle } from '../../components/page/Filters';
import { mockSessions } from '../../data/mock/sessions';
import { formatAbsoluteShort } from '../../lib/format';
import type { Session } from '../../types/session';
import { NewSessionModal } from '../../components/session/NewSessionModal';
import { RowMenu } from '../../components/ui/RowMenu';

export function SessionsListPage() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const data = showArchived ? mockSessions : mockSessions.filter((s) => s.status !== 'archived');

  const allSelected = data.length > 0 && data.every((s) => selected.has(s.id));
  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(data.map((s) => s.id)));
  };

  const columns: Column<Session>[] = [
    {
      key: 'check',
      header: (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={toggleAll}
          className="h-3.5 w-3.5 rounded border-ink-300"
        />
      ),
      render: (s) => (
        <input
          type="checkbox"
          checked={selected.has(s.id)}
          onChange={(e) => {
            const next = new Set(selected);
            if (e.target.checked) next.add(s.id);
            else next.delete(s.id);
            setSelected(next);
          }}
          onClick={(e) => e.stopPropagation()}
          className="h-3.5 w-3.5 rounded border-ink-300"
        />
      ),
      width: '36px',
    },
    { key: 'id', header: 'ID', render: (s) => <CopyableId id={s.id} />, width: '160px' },
    { key: 'name', header: 'Name', render: (s) => <span className="text-ink-700">{s.title || '—'}</span> },
    { key: 'status', header: 'Status', render: (s) => <StatusBadge status={s.status} />, width: '80px' },
    {
      key: 'agent',
      header: 'Agent',
      render: (s) => (
        <span className="inline-flex items-center gap-1.5 text-sm text-ink-800">
          <Share2 size={12} className="text-ink-500" />
          {s.agentName}
        </span>
      ),
    },
    {
      key: 'created',
      header: 'Created',
      render: (s) => <span className="text-sm text-ink-700">{formatAbsoluteShort(s.createdAt)}</span>,
      width: '180px',
    },
    {
      key: 'actions',
      header: '',
      render: (s) => <RowMenu onCopyId={() => navigator.clipboard.writeText(s.id)} />,
      width: '40px',
      align: 'right',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Sessions"
        description="Trace and debug Claude Managed Agents sessions."
        actions={
          <Button variant="primary" leftIcon={<Plus size={14} />} onClick={() => setShowNew(true)}>
            New session
          </Button>
        }
      />

      <div className="mb-3 flex items-center gap-2">
        <GoToIdInput placeholder="Go to session ID" basePath="/sessions" />
        <CreatedFilter />
        <AgentFilter />
        <div className="ml-auto">
          <ShowArchivedToggle value={showArchived} onChange={setShowArchived} />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        rowKey={(s) => s.id}
        onRowClick={(s) => navigate(`/sessions/${s.id}`)}
      />
      <Pagination />

      <NewSessionModal open={showNew} onClose={() => setShowNew(false)} />
    </PageContainer>
  );
}
