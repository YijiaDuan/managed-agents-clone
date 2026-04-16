import { NavLink } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Boxes,
  ChevronDown,
  ChevronRight,
  Code2,
  Database,
  FileText,
  FolderOpen,
  KeyRound,
  Layers,
  Lightbulb,
  ListChecks,
  Receipt,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/cn';
import { UserCard } from './UserCard';

interface NavItem {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
  badge?: string;
  defaultOpen?: boolean;
}

const sections: NavSection[] = [
  {
    id: 'build',
    label: 'Build',
    icon: <Wrench size={14} />,
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
    icon: <Boxes size={14} />,
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
    icon: <Activity size={14} />,
    items: [
      { to: '/analytics/usage', label: 'Usage' },
      { to: '/analytics/cost', label: 'Cost' },
      { to: '/analytics/logs', label: 'Logs' },
      { to: '/analytics/batches', label: 'Batches' },
    ],
    defaultOpen: true,
  },
];

const itemIcons: Record<string, React.ReactNode> = {
  '/build/workbench': <Code2 size={14} />,
  '/build/files': <FileText size={14} />,
  '/build/skills': <Sparkles size={14} />,
  '/quickstart': <Lightbulb size={14} />,
  '/agents': <Boxes size={14} />,
  '/sessions': <Layers size={14} />,
  '/environments': <FolderOpen size={14} />,
  '/vaults': <KeyRound size={14} />,
  '/analytics/usage': <BarChart3 size={14} />,
  '/analytics/cost': <Receipt size={14} />,
  '/analytics/logs': <ListChecks size={14} />,
  '/analytics/batches': <Database size={14} />,
};

function Section({ section }: { section: NavSection }) {
  const [open, setOpen] = useState(section.defaultOpen ?? true);
  return (
    <div className="px-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-ink-800 hover:bg-ink-100"
      >
        <span className="text-ink-500">{section.icon}</span>
        <span>{section.label}</span>
        {section.badge ? (
          <span className="ml-1 rounded-md bg-info-bg px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-info-text">
            {section.badge}
          </span>
        ) : null}
        <span className="ml-auto text-ink-400">
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </span>
      </button>
      {open ? (
        <div className="mt-0.5 mb-2">
          {section.items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-3 py-1.5 pl-7 text-sm transition-colors',
                  isActive
                    ? 'bg-ink-100 font-medium text-ink-900'
                    : 'text-ink-700 hover:bg-ink-50',
                )
              }
            >
              <span className="text-ink-500">{itemIcons[it.to]}</span>
              <span>{it.label}</span>
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="flex h-full w-[240px] flex-col border-r border-ink-200 bg-ink-50">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4">
        <span className="font-serif text-[18px] font-medium tracking-tight text-ink-900">
          Claude Console
        </span>
        <button
          type="button"
          className="rounded-md p-1 text-ink-500 hover:bg-ink-100"
          aria-label="Toggle sidebar"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" />
            <line x1="6" y1="3" x2="6" y2="13" stroke="currentColor" />
          </svg>
        </button>
      </div>

      {/* Workspace switcher */}
      <div className="px-3 pb-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-left text-sm hover:bg-ink-50"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-purple-300 to-purple-500 text-[10px] font-semibold text-white">
            D
          </span>
          <span className="font-medium text-ink-900">Default</span>
          <ChevronDown size={12} className="ml-auto text-ink-400" />
        </button>
      </div>

      {/* Sections */}
      <nav className="flex-1 overflow-y-auto pt-1">
        {sections.map((s) => (
          <Section key={s.id} section={s} />
        ))}

        <div className="mt-6 px-2 pb-2">
          <div className="border-t border-ink-200 pt-3">
            <NavLink
              to="/docs"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-700 hover:bg-ink-100"
            >
              <FileText size={14} className="text-ink-500" />
              Documentation
            </NavLink>
          </div>
        </div>
      </nav>

      <UserCard />
    </aside>
  );
}
