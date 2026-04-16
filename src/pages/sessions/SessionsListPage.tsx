import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
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
import { Boxes } from 'lucide-react';
import { NewSessionModal } from '../../components/session/NewSessionModal';

export function SessionsListPage() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);

  const columns: Column<Session>[] = [
    { key: 'id', header: 'ID', render: (s) => <CopyableId id={s.id} />, width: '160px' },
    { key: 'name', header: 'Name', render: (s) => <span className="text-ink-700">—</span> },
    { key: 'status', header: 'Status', render: (s) => <StatusBadge status={s.status} />, width: '90px' },
    {
      key: 'agent',
      header: 'Agent',
      render: (s) => (
        <span className="inline-flex items-center gap-1.5 text-sm text-ink-800">
          <Boxes size={12} className="text-ink-500" />
          {s.agentName}
        </span>
      ),
    },
    {
      key: 'created',
      header: 'Created',
      render: (s) => <span className="text-xs text-ink-600">{formatAbsoluteShort(s.createdAt)}</span>,
      width: '180px',
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
