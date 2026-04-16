import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { mockMcpServers } from '../../data/mock/vaults';
import type { McpServerOption } from '../../types/vault';
import { cn } from '../../lib/cn';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AddCredentialModal({ open, onClose }: Props) {
  const [type, setType] = useState<'OAuth' | 'Bearer token'>('OAuth');
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<McpServerOption | null>(null);
  const [showList, setShowList] = useState(false);

  const filtered = useMemo(
    () =>
      mockMcpServers.filter(
        (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.url.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add credential"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onClose}>Connect</Button>
        </>
      }
    >
      <p className="-mt-1 mb-4 text-xs text-ink-500">Authorize an MCP server for delegated user authentication.</p>

      <label className="mb-1 block text-xs font-medium text-ink-700">Name <span className="ml-1 text-ink-400">Optional</span></label>
      <Input placeholder="Example MCP" />

      <div className="mt-4">
        <label className="mb-1 flex items-center gap-1 text-xs font-medium text-ink-700">
          Type
          <span className="text-ink-400">ⓘ</span>
        </label>
        <div className="inline-flex rounded-md border border-ink-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setType('OAuth')}
            className={cn(
              'rounded-[5px] px-3 py-1 text-xs font-medium transition-colors',
              type === 'OAuth' ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:bg-ink-50',
            )}
          >
            OAuth
          </button>
          <button
            type="button"
            onClick={() => setType('Bearer token')}
            className={cn(
              'rounded-[5px] px-3 py-1 text-xs font-medium transition-colors',
              type === 'Bearer token' ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:bg-ink-50',
            )}
          >
            Bearer token
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium text-ink-700">MCP Server</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowList((v) => !v)}
            className="flex h-9 w-full items-center justify-between rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-900 hover:bg-ink-50"
          >
            {picked ? (
              <span className="inline-flex items-center gap-2">
                <Initial server={picked} />
                {picked.name}
                <span className="font-mono text-xs text-ink-500">{picked.url}</span>
              </span>
            ) : (
              <span className="text-ink-400">https://mcp.example.com</span>
            )}
            <span className="text-ink-400">▾</span>
          </button>
          {showList ? (
            <div className="absolute left-0 right-0 top-10 z-10 rounded-md border border-ink-200 bg-white shadow-modal">
              <div className="relative border-b border-ink-100">
                <Search size={12} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Anthropic's MCP registry or enter a custom URL"
                  className="h-9 w-full bg-transparent pl-7 pr-3 text-xs text-ink-700 placeholder:text-ink-400 focus:outline-none"
                />
              </div>
              <div className="max-h-64 overflow-y-auto py-1">
                {filtered.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setPicked(s);
                      setShowList(false);
                      setQuery('');
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-ink-50"
                  >
                    <Initial server={s} />
                    <div className="min-w-0">
                      <p className="truncate text-sm text-ink-900">{s.name}</p>
                      <p className="truncate font-mono text-[11px] text-ink-500">{s.url}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

function Initial({ server }: { server: McpServerOption }) {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-semibold text-white"
      style={{ backgroundColor: server.color }}
    >
      {server.initial}
    </span>
  );
}
