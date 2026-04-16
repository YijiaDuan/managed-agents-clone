import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/Sidebar';

export function ConsoleLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
