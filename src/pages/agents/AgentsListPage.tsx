import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { CopyableId } from '../../components/ui/CopyableId';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DataTable, type Column } from '../../components/table/DataTable';
import { Pagination } from '../../components/table/Pagination';
import { PageContainer } from '../../components/page/PageContainer';
import { PageHeader } from '../../components/page/PageHeader';
import { CreatedFilter, GoToIdInput, ShowArchivedToggle } from '../../components/page/Filters';
import { mockAgents } from '../../data/mock/agents';
import { formatRelativeTime } from '../../lib/format';
import type { Agent } from '../../types/agent';
import { NewAgentModal } from '../../components/agent/NewAgentModal';

export function AgentsListPage() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);

  const columns: Column<Agent>[] = [
    {
      key: 'id',
      header: 'ID',
      render: (a) => <CopyableId id={a.id} />,
      width: '160px',
    },
    {
      key: 'name',
      header: 'Name',
      render: (a) => <span className="font-medium text-ink-900">{a.name}</span>,
    },
    {
      key: 'model',
      header: 'Model',
      render: (a) => <span className="font-mono text-xs text-ink-700">{a.model}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (a) => <StatusBadge status={a.status} />,
      width: '100px',
    },
    {
      key: 'created',
      header: 'Created',
      render: (a) => <span className="text-xs text-ink-600">{formatRelativeTime(a.createdAt)}</span>,
      width: '140px',
    },
    {
      key: 'updated',
      header: 'Last updated',
      render: (a) => <span className="text-xs text-ink-600">{formatRelativeTime(a.updatedAt)}</span>,
      width: '140px',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Agents"
        description="Create and manage autonomous agents."
        actions={
          <Button variant="primary" leftIcon={<Plus size={14} />} onClick={() => setShowNew(true)}>
            New agent
          </Button>
        }
      />

      <div className="mb-3 flex items-center gap-2">
        <GoToIdInput placeholder="Go to agent ID" />
        <CreatedFilter />
        <div className="ml-auto">
          <ShowArchivedToggle />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockAgents}
        rowKey={(a) => a.id}
        onRowClick={(a) => navigate(`/agents/${a.id}`)}
      />
      <Pagination />

      <NewAgentModal open={showNew} onClose={() => setShowNew(false)} />
    </PageContainer>
  );
}
