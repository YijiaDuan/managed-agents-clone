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

  const columns: Column<Session>[] = [
    {
      key: 'check',
      header: <input type="checkbox" className="h-3.5 w-3.5 rounded border-ink-300" />,
      render: () => <input type="checkbox" className="h-3.5 w-3.5 rounded border-ink-300" onClick={(e) => e.stopPropagation()} />,
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
    { key: 'actions', header: '', render: () => <RowMenu />, width: '40px', align: 'right' },
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
        <GoToIdInput placeholder="Go to session ID" />
        <CreatedFilter />
        <AgentFilter />
        <div className="ml-auto">
          <ShowArchivedToggle />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockSessions}
        rowKey={(s) => s.id}
        onRowClick={(s) => navigate(`/sessions/${s.id}`)}
      />
      <Pagination />

      <NewSessionModal open={showNew} onClose={() => setShowNew(false)} />
    </PageContainer>
  );
}
