import { ArrowUp, Search } from 'lucide-react';
import { mockTemplates } from '../data/mock/templates';
import { cn } from '../lib/cn';

const steps = [
  { id: 1, label: 'Create agent' },
  { id: 2, label: 'Configure environment' },
  { id: 3, label: 'Start session' },
  { id: 4, label: 'Integrate' },
];

export function QuickstartPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Top stepper bar */}
      <div className="flex items-center gap-6 border-b border-ink-200 px-8 py-3 text-sm">
        <span className="font-medium text-ink-900">Quickstart</span>
        <div className="flex items-center gap-3">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <span
                  className={cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-medium',
                    s.id === 1 ? 'border-ink-900 bg-white text-ink-900' : 'border-ink-300 text-ink-400',
                  )}
                >
                  {s.id}
                </span>
                <span className={cn(s.id === 1 ? 'font-medium text-ink-900' : 'text-ink-500')}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 ? <span className="h-px w-6 bg-ink-300" /> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Center column: prompt hero */}
        <div className="flex flex-1 flex-col items-center justify-between px-8 py-10">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-semibold text-ink-900">What do you want to build?</h1>
            <p className="mt-1.5 text-sm text-ink-500">Describe your agent or start with a template.</p>
          </div>
          <div className="w-full max-w-md pb-4">
            <div className="relative">
              <textarea
                rows={1}
                placeholder="Describe your agent..."
                className="block w-full resize-none rounded-xl border border-ink-200 bg-white px-4 py-3 pr-12 text-sm shadow-card placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-200"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md bg-orange-200 text-orange-900 hover:bg-orange-300"
                aria-label="Send"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right column: templates */}
        <div className="w-[640px] overflow-y-auto px-6 py-8">
          <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
            <h2 className="text-base font-semibold text-ink-900">Browse templates</h2>
            <div className="relative mt-3">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                placeholder="Search templates"
                className="h-9 w-full rounded-md border border-ink-200 bg-white pl-9 pr-3 text-sm placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-200"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {mockTemplates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={cn(
                    'rounded-lg border bg-white p-3 text-left transition-colors hover:border-ink-400',
                    t.highlighted ? 'border-ink-300 bg-ink-50' : 'border-ink-200',
                  )}
                >
                  <p className="text-sm font-medium text-ink-900">{t.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-500">{t.description}</p>
                  {t.connectorIcons.length ? (
                    <div className="mt-2 flex items-center gap-0.5">
                      {t.connectorIcons.map((c, i) => (
                        <span
                          key={i}
                          className="inline-flex h-4 w-4 items-center justify-center rounded text-[9px] font-semibold text-white"
                          style={{ backgroundColor: c.color }}
                        >
                          {c.initial}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
