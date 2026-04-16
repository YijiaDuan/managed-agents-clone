import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Archive, Plus, Trash } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CopyableId } from '../../components/ui/CopyableId';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DataTable, type Column } from '../../components/table/DataTable';
import { Pagination } from '../../components/table/Pagination';
import { getVault } from '../../data/mock/vaults';
import { formatRelativeTime } from '../../lib/format';
import type { Credential } from '../../types/vault';
import { AddCredentialModal } from '../../components/credential/AddCredentialModal';
import { RowMenu } from '../../components/ui/RowMenu';
import { cn } from '../../lib/cn';

export function VaultDetailPage() {
  const { vaultId } = useParams<{ vaultId: string }>();
  const vault = vaultId ? getVault(vaultId) : undefined;
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  if (!vault) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-8">
        <p className="text-sm text-ink-500">Vault not found.</p>
      </div>
    );
  }

  const credentials = filter === 'all' ? vault.credentials : vault.credentials.filter((c) => c.status === 'active');

  const columns: Column<Credential>[] = [
    { key: 'id', header: 'ID', render: (c) => <CopyableId id={c.id} />, width: '140px' },
    { key: 'name', header: 'Name', render: (c) => <span className="text-ink-900">{c.name}</span> },
    {
      key: 'type',
      header: 'Type',
      render: (c) => <span className="text-ink-700">{c.type}</span>,
      width: '120px',
    },
    {
      key: 'mcp',
      header: 'MCP server URL',
      render: (c) => <span className="font-mono text-xs text-ink-700">{c.mcpServerUrl}</span>,
    },
    { key: 'status', header: 'Status', render: (c) => <StatusBadge status={c.status} />, width: '90px' },
    { key: 'updated', header: 'Updated', render: (c) => <span className="text-sm text-ink-700">{formatRelativeTime(c.updatedAt)}</span>, width: '120px' },
    { key: 'actions', header: '', render: () => <RowMenu />, width: '40px', align: 'right' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-8 pt-6 pb-12">
      <div className="mb-6 text-sm text-ink-500">
        <Link to="/vaults" className="hover:text-ink-900">Credential vaults</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-900">{vault.name}</span>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-ink-900">{vault.name}</h1>
            <StatusBadge status={vault.status} />
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <CopyableId id={vault.id} full />
            <span className="text-ink-300">·</span>
            <span>Created: {formatRelativeTime(vault.createdAt)}</span>
            <span className="text-ink-300">·</span>
            <span>Updated: {formatRelativeTime(vault.updatedAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leftIcon={<Archive size={13} />}>Archive</Button>
          <Button variant="danger" leftIcon={<Trash size={13} />}>Delete</Button>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink-900">Credentials</h2>
        <Button variant="primary" leftIcon={<Plus size={14} />} onClick={() => setShowAdd(true)}>
          Add credential
        </Button>
      </div>

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
        data={credentials}
        rowKey={(c) => c.id}
      />
      <Pagination />

      <AddCredentialModal open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}
