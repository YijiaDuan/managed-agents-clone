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
import { mockEnvironments } from '../../data/mock/environments';
import type { Environment } from '../../types/environment';
import { NewEnvironmentModal } from '../../components/environment/NewEnvironmentModal';
import { RowMenu } from '../../components/ui/RowMenu';
import { cn } from '../../lib/cn';

export function EnvironmentsListPage() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  const data = filter === 'all' ? mockEnvironments : mockEnvironments.filter((e) => e.status === 'active');

  const columns: Column<Environment>[] = [
    { key: 'id', header: 'ID', render: (e) => <CopyableId id={e.id} />, width: '160px' },
    { key: 'name', header: 'Name', render: (e) => <span className="font-medium text-ink-900">{e.name}</span> },
    { key: 'status', header: 'Status', render: (e) => <StatusBadge status={e.status} />, width: '90px' },
    {
      key: 'type',
      header: 'Type',
      render: (e) => (
        <span className="inline-flex items-center rounded-md border border-ink-200 px-1.5 py-0.5 text-xs text-ink-700">
          {e.type}
        </span>
      ),
      width: '120px',
    },
    {
      key: 'actions',
      header: '',
      render: (e) => <RowMenu onCopyId={() => navigator.clipboard.writeText(e.id)} />,
      width: '40px',
      align: 'right',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Environments"
        description="Configuration template for containers, such as sessions or code execution."
        actions={
          <Button variant="primary" leftIcon={<Plus size={14} />} onClick={() => setShowNew(true)}>
            Add environment
          </Button>
        }
      />

      <div className="mb-3 inline-flex items-center gap-1">
        {(['all', 'active'] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={cn(
              'rounded-md px-3 py-1 text-sm font-medium transition-colors',
              filter === id ? 'bg-white text-ink-900 shadow-card border border-ink-200' : 'text-ink-500 hover:text-ink-800',
            )}
          >
            {id === 'all' ? 'All' : 'Active'}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={data}
        rowKey={(e) => e.id}
        onRowClick={(e) => navigate(`/environments/${e.id}`)}
      />
      <Pagination />

      <NewEnvironmentModal open={showNew} onClose={() => setShowNew(false)} />
    </PageContainer>
  );
}
