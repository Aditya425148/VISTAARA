import { Clapperboard, Heart, History, Home, LogOut, Settings, Tv } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/', label: 'Movies', icon: Clapperboard },
  { to: '/', label: 'TV Shows', icon: Tv },
  { to: '/favorites', label: 'My Favorites', icon: Heart },
  { to: '/history', label: 'Recently Watched', icon: History },
  { to: '/', label: 'Settings', icon: Settings }
];

export default function Sidebar() {
  const dispatch = useDispatch();
  return (
    <aside className="group/sidebar fixed bottom-0 left-0 top-20 z-40 hidden w-20 overflow-hidden border-r border-white/10 bg-black/28 px-4 py-7 backdrop-blur-2xl transition-all duration-300 hover:w-72 hover:bg-black/48 lg:block">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-60" />
      <nav className="relative mt-10 space-y-4 text-sm font-semibold text-white/58">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.label} to={item.to} className={({ isActive }) => `group/item flex h-11 items-center gap-5 rounded-md px-3 transition ${isActive && item.to !== '/' ? 'text-white' : ''}`}>
              {({ isActive }) => (
                <>
                  <Icon className={`h-[18px] w-[18px] flex-none transition group-hover/item:text-white ${isActive ? 'text-white' : ''}`} />
                  <span className={`origin-left whitespace-nowrap opacity-0 transition duration-200 group-hover/sidebar:opacity-100 group-hover/item:scale-110 group-hover/item:text-white ${isActive ? 'scale-110 text-white' : ''}`}>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
        <button onClick={() => dispatch(logout())} className="group/item flex h-11 w-full items-center gap-5 rounded-md px-3 text-left transition">
          <LogOut className="h-[18px] w-[18px] flex-none transition group-hover/item:text-white" />
          <span className="origin-left whitespace-nowrap opacity-0 transition duration-200 group-hover/sidebar:opacity-100 group-hover/item:scale-110 group-hover/item:text-white">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
