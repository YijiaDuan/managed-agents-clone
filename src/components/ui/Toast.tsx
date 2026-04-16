import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';

let toastId = 0;
type Listener = (msg: string) => void;
const listeners = new Set<Listener>();

export function toast(message: string) {
  listeners.forEach((l) => l(message));
}

interface ToastItem {
  id: number;
  message: string;
}

export function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const fn: Listener = (msg) => {
      const id = ++toastId;
      setItems((prev) => [...prev, { id, message: msg }]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 2400);
    };
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  if (items.length === 0) return null;
  return createPortal(
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 space-y-2">
      {items.map((t) => (
        <ToastBubble key={t.id} message={t.message} onClose={() => setItems((prev) => prev.filter((p) => p.id !== t.id))} />
      ))}
    </div>,
    document.body,
  );
}

function ToastBubble({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="pointer-events-auto flex min-w-[260px] items-center gap-2 rounded-md border border-ink-200 bg-ink-900 px-3 py-2 text-sm text-white shadow-modal">
      <Check size={14} className="text-success-bg" />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="rounded-md p-0.5 text-white/70 hover:bg-white/10 hover:text-white">
        <X size={12} />
      </button>
    </div>
  );
}

export function ToastWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastHost />
    </>
  );
}
