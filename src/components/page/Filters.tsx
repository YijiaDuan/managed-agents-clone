import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { Dropdown } from '../ui/Dropdown';

interface FilterChipProps {
  label: string;
  value: string;
  options: string[];
  onChange?: (v: string) => void;
}

function FilterChip({ label, value, options, onChange }: FilterChipProps) {
  return (
    <Dropdown
      align="left"
      trigger={
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-md border border-ink-200 bg-white px-3 text-sm hover:bg-ink-50"
        >
          <span className="font-medium text-ink-800">{label}</span>
          <span className="text-ink-500">{value}</span>
          <ChevronDown size={12} className="text-ink-400" />
        </button>
      }
      items={options.map((opt) => ({
        label: (
          <span className="flex w-full items-center justify-between gap-2">
            <span>{opt}</span>
            {opt === value ? <Check size={12} className="text-ink-700" /> : null}
          </span>
        ) as ReactNode,
        onClick: () => onChange?.(opt),
      }))}
    />
  );
}

export function CreatedFilter() {
  const [value, setValue] = useState('All time');
  return (
    <FilterChip
      label="Created"
      value={value}
      options={['All time', 'Last 24 hours', 'Last 7 days', 'Last 30 days']}
      onChange={setValue}
    />
  );
}

export function VersionFilter() {
  const [value, setValue] = useState('All');
  return (
    <FilterChip
      label="Version"
      value={value}
      options={['All', 'v1', 'v2', 'v3']}
      onChange={setValue}
    />
  );
}

export function AgentFilter() {
  const [value, setValue] = useState('All');
  return (
    <FilterChip
      label="Agent"
      value={value}
      options={['All', 'Agent 1', 'Agent 2', 'Agent 3', 'Agent 4', 'Agent 5']}
      onChange={setValue}
    />
  );
}

interface GoToIdInputProps {
  placeholder: string;
  className?: string;
  basePath: string; // e.g. /agents, /sessions
}

export function GoToIdInput({ placeholder, className, basePath }: GoToIdInputProps) {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) navigate(`${basePath}/${value.trim()}`);
      }}
      className={cn('relative h-9', className)}
    >
      <ArrowRight
        size={13}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-72 rounded-md border border-ink-200 bg-white pl-8 pr-3 text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-200"
      />
    </form>
  );
}

interface ShowArchivedToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
}

export function ShowArchivedToggle({ value, onChange }: ShowArchivedToggleProps) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-2 text-sm text-ink-700">
      Show archived
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={cn(
          'inline-flex h-4 w-7 items-center rounded-full transition-colors',
          value ? 'bg-ink-800' : 'bg-ink-200',
        )}
      >
        <span
          className={cn(
            'inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform',
            value ? 'translate-x-3.5' : 'translate-x-0.5',
          )}
        />
      </button>
    </label>
  );
}
