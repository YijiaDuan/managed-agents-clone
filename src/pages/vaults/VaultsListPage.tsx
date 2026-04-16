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
import { Tabs } from '../../components/ui/Tabs';
import { mockVaults } from '../../data/mock/vaults';
import { formatAbsoluteShort } from '../../lib/format';
import type { Vault } from '../../types/vault';
import { NewVaultModal } from '../../components/credential/NewVaultModal';

export function VaultsListPage() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  const data = filter === 'all' ? mockVaults : mockVaults.filter((v) => v.status === 'active');

  const columns: Column<Vault>[] = [
    { key: 'id', header: 'ID', render: (v) => <CopyableId id={v.id} />, width: '160px' },
    { key: 'name', header: 'Name', render: (v) => <span className="font-medium text-ink-900">{v.name}</span> },
    { key: 'status', header: 'Status', render: (v) => <StatusBadge status={v.status} />, width: '90px' },
    { key: 'created', header: 'Created', render: (v) => <span className="text-xs text-ink-600">{formatAbsoluteShort(v.createdAt)}</span>, width: '180px' },
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

      <div className="mb-3">
        <Tabs
          items={[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active' },
          ]}
          activeId={filter}
          onChange={(id) => setFilter(id as 'all' | 'active')}
        />
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
