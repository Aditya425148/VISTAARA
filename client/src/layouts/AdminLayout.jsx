import { Link, Outlet } from 'react-router-dom';
import { BarChart3, Clapperboard, Home } from 'lucide-react';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-panel/90 p-6 lg:block">
        <h1 className="text-xl font-extrabold">Vistaara Admin</h1>
        <nav className="mt-10 space-y-2 text-sm">
          <Link className="flex items-center gap-3 rounded-md px-3 py-3 hover:bg-white/10" to="/admin"><BarChart3 size={18} /> Dashboard</Link>
          <Link className="flex items-center gap-3 rounded-md px-3 py-3 hover:bg-white/10" to="/admin/content"><Clapperboard size={18} /> Content</Link>
          <Link className="flex items-center gap-3 rounded-md px-3 py-3 hover:bg-white/10" to="/"><Home size={18} /> View App</Link>
        </nav>
      </aside>
      <main className="min-h-screen p-4 lg:ml-64 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
