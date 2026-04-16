import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/Sidebar';
import { ToastHost } from '../components/ui/Toast';

export function ConsoleLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((v) => !v)} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <ToastHost />
    </div>
  );
}
