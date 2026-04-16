import { NavLink } from 'react-router-dom';
import {
  Activity,
  Briefcase,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  PanelLeft,
  Plus,
  Share2,
  TerminalSquare,
  Wrench,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { UserCard } from './UserCard';
import { Dropdown } from '../ui/Dropdown';
import { workspaces } from '../../data/mock/currentUser';

interface NavItem {
  to: string;
  label: string;
}

interface NavSection {
  id: string;
  label: string;
  icon: ReactNode;
  items: NavItem[];
  badge?: string;
  defaultOpen?: boolean;
}

const sections: NavSection[] = [
  {
    id: 'build',
    label: 'Build',
    icon: <Wrench size={14} strokeWidth={1.6} />,
    items: [
      { to: '/build/workbench', label: 'Workbench' },
      { to: '/build/files', label: 'Files' },
      { to: '/build/skills', label: 'Skills' },
    ],
    defaultOpen: true,
  },
  {
    id: 'managed',
    label: 'Managed Agents',
    icon: <Share2 size={14} strokeWidth={1.6} />,
    badge: 'New',
    items: [
      { to: '/quickstart', label: 'Quickstart' },
      { to: '/agents', label: 'Agents' },
      { to: '/sessions', label: 'Sessions' },
      { to: '/environments', label: 'Environments' },
      { to: '/vaults', label: 'Credential vaults' },
    ],
    defaultOpen: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <Activity size={14} strokeWidth={1.6} />,
    items: [
      { to: '/analytics/usage', label: 'Usage' },
      { to: '/analytics/cost', label: 'Cost' },
      { to: '/analytics/logs', label: 'Logs' },
    ],
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    icon: <TerminalSquare size={14} strokeWidth={1.6} />,
    items: [],
  },
  {
    id: 'manage',
    label: 'Manage',
    icon: <Briefcase size={14} strokeWidth={1.6} />,
    items: [],
  },
];

function Section({ section }: { section: NavSection }) {
  const [open, setOpen] = useState(section.defaultOpen ?? false);
  const hasItems = section.items.length > 0;
  return (
    <div>
      <button
        type="button"
        onClick={() => hasItems && setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-ink-800 hover:bg-ink-100"
      >
        <span className="text-ink-500">{section.icon}</span>
        <span>{section.label}</span>
        {section.badge ? (
          <span className="ml-1 text-[11px] font-medium text-info-text">
            {section.badge}
          </span>
        ) : null}
        <span className="ml-auto text-ink-400">
          {hasItems ? (open ? <ChevronDown size={12} /> : <ChevronRight size={12} />) : <ChevronRight size={12} />}
        </span>
      </button>
      {open && hasItems ? (
        <div className="pb-1">
          {section.items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 py-1.5 pl-11 pr-4 text-sm transition-colors',
                  isActive
                    ? 'bg-ink-200/70 font-medium text-ink-900'
                    : 'text-ink-700 hover:bg-ink-100',
                )
              }
            >
              {it.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}

interface Props {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export function Sidebar({ collapsed, onToggleCollapsed }: Props) {
  const [workspace, setWorkspace] = useState('Default');

  if (collapsed) {
    return (
      <aside className="flex h-full w-[52px] flex-col items-center border-r border-ink-200 bg-ink-50 py-3">
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="rounded-md p-1.5 text-ink-500 hover:bg-ink-100"
          aria-label="Expand sidebar"
        >
          <PanelLeft size={14} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-[256px] flex-col border-r border-ink-200 bg-ink-50">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className="font-serif text-[20px] font-medium tracking-tight text-ink-900">
          Claude Console
        </span>
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="rounded-md p-1 text-ink-500 hover:bg-ink-100"
          aria-label="Collapse sidebar"
        >
          <PanelLeft size={14} />
        </button>
      </div>

      <div className="px-3 pb-3">
        <Dropdown
          align="left"
          trigger={
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-left text-sm hover:bg-ink-50"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-purple-300 via-purple-400 to-indigo-400">
                <span className="block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white/70" />
              </span>
              <span className="font-medium text-ink-900">{workspace}</span>
              <ChevronDown size={12} className="ml-auto text-ink-400" />
            </button>
          }
          items={[
            ...workspaces.map((w) => ({
              label: (
                <span className="flex w-full items-center justify-between gap-2">
                  <span>{w}</span>
                  {w === workspace ? <Check size={12} className="text-ink-700" /> : null}
                </span>
              ),
              onClick: () => setWorkspace(w),
            })),
            { label: <span className="flex items-center gap-1.5"><Plus size={12} /> New workspace</span> },
          ]}
        />
      </div>

      <nav className="flex-1 overflow-y-auto pb-3">
        {sections.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </nav>

      <div className="border-t border-ink-200">
        <NavLink
          to="/docs"
          className="flex items-center gap-2 px-4 py-3 text-sm text-ink-700 hover:bg-ink-100"
        >
          <FileText size={14} strokeWidth={1.6} className="text-ink-500" />
          Documentation
        </NavLink>
      </div>

      <UserCard />
    </aside>
  );
}
