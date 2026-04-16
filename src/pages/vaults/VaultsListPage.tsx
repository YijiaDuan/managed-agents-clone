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
import { mockVaults } from '../../data/mock/vaults';
import { formatAbsoluteShort } from '../../lib/format';
import type { Vault } from '../../types/vault';
import { NewVaultModal } from '../../components/credential/NewVaultModal';
import { RowMenu } from '../../components/ui/RowMenu';
import { cn } from '../../lib/cn';

export function VaultsListPage() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  const data = filter === 'all' ? mockVaults : mockVaults.filter((v) => v.status === 'active');

  const columns: Column<Vault>[] = [
    { key: 'id', header: 'ID', render: (v) => <CopyableId id={v.id} />, width: '160px' },
    { key: 'name', header: 'Name', render: (v) => <span className="font-medium text-ink-900">{v.name}</span> },
    { key: 'status', header: 'Status', render: (v) => <StatusBadge status={v.status} />, width: '90px' },
    { key: 'created', header: 'Created', render: (v) => <span className="text-sm text-ink-700">{formatAbsoluteShort(v.createdAt)}</span>, width: '180px' },
    {
      key: 'actions',
      header: '',
      render: (v) => <RowMenu onCopyId={() => navigator.clipboard.writeText(v.id)} />,
      width: '40px',
      align: 'right',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Credential vaults"
        description="Manage credential vaults that provide your agents with access to MCP servers and other tools."
        actions={
          <Button variant="primary" leftIcon={<Plus size={14} />} onClick={() => setShowNew(true)}>
            New vault
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
        rowKey={(v) => v.id}
        onRowClick={(v) => navigate(`/vaults/${v.id}`)}
      />
      <Pagination />

      <NewVaultModal open={showNew} onClose={() => setShowNew(false)} />
    </PageContainer>
  );
}
