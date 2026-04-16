import { AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NewVaultModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create vault"
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onClose}>Create</Button>
        </>
      }
    >
      <div className="mb-3 flex items-start gap-2 rounded-md border border-warn-bg bg-warn-bg/40 px-3 py-2 text-xs text-warn-text">
        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
        <p>
          Vaults are shared across this workspace. Credentials added to this vault will be usable by anyone with API key access.{' '}
          <a className="underline" href="#">Learn more here.</a>
        </p>
      </div>
      <label className="mb-1 block text-xs font-medium text-ink-700">Name</label>
      <Input placeholder="Production MCP Vault" defaultValue="Production MCP Vault" />
      <p className="mt-1 text-[11px] text-ink-500">50 characters or fewer.</p>
    </Modal>
  );
}
