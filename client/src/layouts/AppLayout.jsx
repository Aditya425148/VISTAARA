import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Sidebar />
      <Topbar />
      <main className="min-h-screen pb-10 lg:pl-20">
        <Outlet />
      </main>
    </div>
  );
}
