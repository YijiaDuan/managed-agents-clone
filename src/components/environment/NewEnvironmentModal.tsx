import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NewEnvironmentModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add environment"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onClose}>Create</Button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-700">Name</label>
          <Input placeholder="E.g. My Environment" />
          <p className="mt-1 text-[11px] text-ink-500">50 characters or fewer.</p>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-700">Hosting Type</label>
          <div className="flex h-9 items-center justify-between rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-900 hover:bg-ink-50">
            Cloud
            <span className="text-ink-400">▾</span>
          </div>
          <p className="mt-1 text-[11px] text-ink-500">This cannot be changed after creation.</p>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium text-ink-700">Description</label>
        <Textarea placeholder="Optional description for this environment" rows={4} />
      </div>
    </Modal>
  );
}
