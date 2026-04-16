import { Plus } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from '../ui/Toast';

interface Props {
  open: boolean;
  onClose: () => void;
}

function FieldLabel({ children, link }: { children: React.ReactNode; link?: string }) {
  return (
    <div className="mb-1 flex items-center justify-between">
      <label className="text-xs font-medium text-ink-700">{children}</label>
      {link ? (
        <a className="text-[11px] text-ink-500 hover:text-ink-900" href="#">
          {link} ↗
        </a>
      ) : null}
    </div>
  );
}

function PlaceholderSelect({ placeholder }: { placeholder: string }) {
  return (
    <button
      type="button"
      onClick={() => toast('Picker not implemented in this demo')}
      className="flex h-9 w-full items-center justify-between rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-400 hover:bg-ink-50"
    >
      {placeholder}
      <span className="text-ink-400">▾</span>
    </button>
  );
}

export function NewSessionModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create session"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            onClick={() => {
              toast('Session created (mock)');
              onClose();
            }}
          >
            Create session
          </Button>
        </>
      }
    >
      <p className="-mt-1 mb-4 text-xs text-ink-500">Set up an instance of your agent in its environment.</p>

      <div className="space-y-3">
        <div>
          <FieldLabel>Title</FieldLabel>
          <Input placeholder="Optional - name this run" />
        </div>
        <div>
          <FieldLabel link="Manage agents">Agent</FieldLabel>
          <PlaceholderSelect placeholder="Select an agent" />
        </div>
        <div>
          <FieldLabel link="Manage environments">Environment</FieldLabel>
          <PlaceholderSelect placeholder="Select an environment" />
        </div>
        <div>
          <FieldLabel link="Manage credential vaults">Credential vaults</FieldLabel>
          <PlaceholderSelect placeholder="Select one or more vaults" />
        </div>
        <div>
          <FieldLabel>Resources</FieldLabel>
          <p className="mb-2 text-[11px] text-ink-500">Mount files or GitHub repositories into the session container.</p>
          <button
            type="button"
            onClick={() => toast('Resource picker (mock)')}
            className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-ink-300 bg-white px-3 py-1.5 text-xs text-ink-700 hover:bg-ink-50"
          >
            <Plus size={12} /> Resource
          </button>
        </div>
      </div>
    </Modal>
  );
}
