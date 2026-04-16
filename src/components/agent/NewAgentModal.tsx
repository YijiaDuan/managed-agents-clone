import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { mockTemplates } from '../../data/mock/templates';
import { cn } from '../../lib/cn';

interface Props {
  open: boolean;
  onClose: () => void;
}

const yamlSnippet = `name: Untitled agent
description: A blank starting point with the core toolset.
model: claude-opus-4-6
system: You are a general-purpose agent that can research, write code, run commands, and use connected tools to complete the user's task end to end.
mcp_servers: []
tools:
  - type: agent_toolset_20260401
skills: []`;

const jsonSnippet = `{
  "name": "Untitled agent",
  "description": "A blank starting point with the core toolset.",
  "model": "claude-opus-4-6",
  "system": "You are a general-purpose agent that can research, write code, run commands, and use connected tools to complete the user's task end to end.",
  "mcp_servers": [],
  "tools": [{ "type": "agent_toolset_20260401" }],
  "skills": []
}`;

export function NewAgentModal({ open, onClose }: Props) {
  const [mode, setMode] = useState<'describe' | 'template'>('describe');
  const [format, setFormat] = useState<'yaml' | 'json'>('yaml');
  const [describe, setDescribe] = useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create agent"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onClose}>Create agent</Button>
        </>
      }
    >
      <p className="-mt-1 mb-4 text-xs text-ink-500">Start from a template or describe what you need.</p>

      <div className="mb-3">
        <p className="mb-2 text-xs font-medium text-ink-700">Starting point</p>
        <div className="inline-flex rounded-md border border-ink-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setMode('describe')}
            className={cn(
              'rounded-[5px] px-3 py-1 text-xs font-medium transition-colors',
              mode === 'describe' ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:bg-ink-50',
            )}
          >
            Describe your agent
          </button>
          <button
            type="button"
            onClick={() => setMode('template')}
            className={cn(
              'rounded-[5px] px-3 py-1 text-xs font-medium transition-colors',
              mode === 'template' ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:bg-ink-50',
            )}
          >
            Template
          </button>
        </div>
      </div>

      {mode === 'describe' ? (
        <div className="mb-4">
          <textarea
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
            placeholder="Summarizes new GitHub PRs and posts a digest to Slack."
            rows={3}
            className="block w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-200"
          />
          <div className="mt-2 flex justify-end">
            <Button variant="secondary" size="sm">Generate</Button>
          </div>
        </div>
      ) : (
        <div className="mb-4 grid grid-cols-3 gap-2">
          {mockTemplates.slice(0, 6).map((t) => (
            <button
              key={t.id}
              type="button"
              className="rounded-md border border-ink-200 bg-white p-2.5 text-left hover:border-ink-400 hover:bg-ink-50"
            >
              <p className="text-xs font-medium text-ink-900">{t.name}</p>
              <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-ink-500">{t.description}</p>
            </button>
          ))}
        </div>
      )}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-ink-700">Agent config</p>
        </div>
        <Tabs
          items={[
            { id: 'yaml', label: 'YAML' },
            { id: 'json', label: 'JSON' },
          ]}
          activeId={format}
          onChange={(id) => setFormat(id as 'yaml' | 'json')}
        />
        <pre className="mt-2 max-h-60 overflow-auto rounded-md border border-ink-200 bg-ink-50 p-3 font-mono text-xs leading-relaxed text-ink-800">
          {format === 'yaml' ? yamlSnippet : jsonSnippet}
        </pre>
      </div>
    </Modal>
  );
}
