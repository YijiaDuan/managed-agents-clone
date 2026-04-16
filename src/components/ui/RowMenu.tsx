import { Archive, Copy, MoreVertical, Trash } from 'lucide-react';
import { Dropdown } from './Dropdown';
import { toast } from './Toast';

interface Props {
  onCopyId?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export function RowMenu({ onCopyId, onArchive, onDelete }: Props) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="inline-flex">
      <Dropdown
        align="right"
        trigger={
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100"
            aria-label="More actions"
          >
            <MoreVertical size={14} />
          </button>
        }
        items={[
          {
            label: 'Copy ID',
            icon: <Copy size={13} />,
            onClick: () => {
              onCopyId?.();
              toast('ID copied to clipboard');
            },
          },
          {
            label: 'Archive',
            icon: <Archive size={13} />,
            onClick: () => {
              onArchive?.();
              toast('Archived (mock)');
            },
          },
          {
            label: 'Delete',
            icon: <Trash size={13} />,
            onClick: () => {
              onDelete?.();
              toast('Deleted (mock)');
            },
            danger: true,
          },
        ]}
      />
    </div>
  );
}
