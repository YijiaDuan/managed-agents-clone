import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/cn';
import { shortId } from '../../lib/format';

interface Props {
  id: string;
  className?: string;
  full?: boolean;
}

export function CopyableId({ id, className, full = false }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <span
      className={cn('inline-flex items-center gap-1 font-mono text-xs text-ink-700', className)}
    >
      <span>{full ? id : shortId(id)}</span>
      <button
        type="button"
        onClick={onCopy}
        className="text-ink-400 hover:text-ink-700"
        aria-label="Copy id"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </span>
  );
}
