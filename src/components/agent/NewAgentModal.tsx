import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { mockTemplates } from '../../data/mock/templates';
import type { Template } from '../../types/template';
import { cn } from '../../lib/cn';

interface Props {
  open: boolean;
  onClose: () => void;
}

const yamlConfig = [
  { key: 'name:', value: ' Untitled agent' },
  { key: 'description:', value: ' A blank starting point with the core toolset.' },
  { key: 'model:', value: ' claude-sonnet-4-6' },
  {
    key: 'system:',
    value: " You are a general-purpose agent that can research, write code, run commands, and use\nconnected tools to complete the user's task end to end.",
  },
  { key: 'mcp_servers:', value: ' []' },
  { key: 'tools:', value: '' },
  { key: '  - type:', value: ' agent_toolset_20260401', indent: true },
  { key: 'skills:', value: ' []' },
];

const jsonConfig = `{
  "name": "Untitled agent",
  "description": "A blank starting point with the core toolset.",
  "model": "claude-sonnet-4-6",
  "system": "You are a general-purpose agent that can research, write code, run commands, and use connected tools to complete the user's task end to end.",
  "mcp_servers": [],
  "tools": [{ "type": "agent_toolset_20260401" }],
  "skills": []
}`;

export function NewAgentModal({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<'describe' | 'template'>('describe');
  const [picked, setPicked] = useState<Template | null>(null);
  const [format, setFormat] = useState<'yaml' | 'json'>('yaml');
  const [describe, setDescribe] = useState('');

  const startingLabel = picked
    ? picked.name
    : mode === 'describe'
      ? 'Blank agent'
      : 'Blank agent';

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      contentClassName="max-w-3xl"
    >
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-ink-900">Create agent</h2>
        <p className="mt-1 text-sm text-ink-500">Start from a template or describe what you need.</p>
      </div>

      {/* Starting point row */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between border-b border-ink-200 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-ink-900">Starting point</span>
          {!expanded ? (
            <>
              <span className="text-ink-300">·</span>
              <span className="text-ink-700">{startingLabel}</span>
            </>
          ) : null}
        </span>
        {expanded ? <ChevronUp size={14} className="text-ink-400" /> : <ChevronDown size={14} className="text-ink-400" />}
      </button>

      {expanded ? (
        <div className="border-b border-ink-200 py-4">
          {/* Big segmented control */}
          <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg border border-ink-200 bg-ink-100 p-1">
            <button
              type="button"
              onClick={() => setMode('describe')}
              className={cn(
                'rounded-md py-2 text-sm font-medium transition-colors',
                mode === 'describe' ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500 hover:text-ink-800',
              )}
            >
              Describe your agent
            </button>
            <button
              type="button"
              onClick={() => setMode('template')}
              className={cn(
                'rounded-md py-2 text-sm font-medium transition-colors',
                mode === 'template' ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500 hover:text-ink-800',
              )}
            >
              Template
            </button>
          </div>

          {mode === 'describe' ? (
            <div className="rounded-lg border border-ink-200 bg-white p-3">
              <textarea
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
                placeholder="Summarizes new GitHub PRs and posts a digest to Slack."
                rows={3}
                className="block w-full resize-none border-0 px-1 text-sm placeholder:text-ink-400 focus:outline-none"
              />
              <div className="mt-2 flex justify-end">
                <Button variant="secondary" size="sm">Generate</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {mockTemplates.slice(0, 6).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPicked(t)}
                  className={cn(
                    'rounded-lg border bg-white p-3 text-left transition-colors hover:border-ink-400',
                    picked?.id === t.id ? 'border-ink-900' : 'border-ink-200',
                  )}
                >
                  <p className="text-xs font-semibold text-ink-900">{t.name}</p>
                  <p className="mt-1 line-clamp-3 text-[11px] leading-tight text-ink-500">{t.description}</p>
                  {t.connectorIcons.length ? (
                    <div className="mt-2 flex items-center gap-0.5">
                      {t.connectorIcons.map((c, i) => (
                        <span
                          key={i}
                          className="inline-flex h-3.5 w-3.5 items-center justify-center rounded text-[8px] font-semibold text-white"
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
          )}
        </div>
      ) : null}

      {/* Agent config */}
      <div className="py-4">
        <p className="mb-3 text-sm font-semibold text-ink-900">Agent config</p>

        <div className="rounded-lg border border-ink-200 bg-white">
          <div className="flex items-center justify-between border-b border-ink-200 px-3 py-2">
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFormat('yaml')}
                className={cn(
                  'rounded-md px-2 py-1 text-xs font-medium transition-colors',
                  format === 'yaml' ? 'bg-ink-100 text-ink-900' : 'text-ink-500 hover:text-ink-800',
                )}
              >
                YAML
              </button>
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={cn(
                  'rounded-md px-2 py-1 text-xs font-medium transition-colors',
                  format === 'json' ? 'bg-ink-100 text-ink-900' : 'text-ink-500 hover:text-ink-800',
                )}
              >
                JSON
              </button>
            </div>
            <button
              type="button"
              className="rounded-md p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
              aria-label="Copy"
            >
              <Copy size={13} />
            </button>
          </div>
          <pre className="max-h-72 overflow-auto px-4 py-3 font-mono text-xs leading-relaxed">
            {format === 'yaml' ? (
              <code>
                {yamlConfig.map((line, i) => (
                  <div key={i}>
                    <span className="text-blue-700">{line.key}</span>
                    <span className="text-ink-800 whitespace-pre">{line.value}</span>
                  </div>
                ))}
              </code>
            ) : (
              <code className="text-ink-800">{jsonConfig}</code>
            )}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div className="-mx-6 -mb-5 flex justify-end border-t border-ink-200 bg-white px-6 py-3">
        <Button variant="primary" onClick={onClose}>Create agent</Button>
      </div>
    </Modal>
  );
}
