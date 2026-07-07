import { Bell, Search, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchMovies } from '../redux/slices/movieSlice';

export default function Topbar() {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const { searchResults } = useSelector((state) => state.movies);
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    const id = setTimeout(() => dispatch(searchMovies(term)), 180);
    return () => clearTimeout(id);
  }, [dispatch, term]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center gap-4 border-b border-white/10 bg-black/28 px-4 backdrop-blur-2xl sm:px-8">
      <Link to="/" className="vistaara-wordmark text-[1.45rem] sm:text-[2.35rem]">VISTAARA</Link>
      <div className="relative ml-auto hidden w-full max-w-sm sm:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45" size={18} />
        <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search movies, genres" className="h-11 w-full rounded-md border border-white/10 bg-white/8 pl-11 pr-4 text-sm outline-none transition focus:border-white/30 focus:bg-white/12" />
        {term && (
          <div className="absolute right-0 top-14 max-h-96 w-full overflow-auto rounded-md border border-white/10 bg-black/80 p-2 backdrop-blur-2xl">
            {searchResults.map((movie) => (
              <Link key={movie._id} to={`/movie/${movie._id}`} onClick={() => setTerm('')} className="flex items-center gap-3 rounded p-2 hover:bg-white/10">
                <img src={movie.thumbnail} className="h-14 w-24 rounded object-cover" />
                <span className="text-sm font-semibold">{movie.title}</span>
              </Link>
            ))}
            {!searchResults.length && <p className="p-4 text-sm text-white/55">No results found</p>}
          </div>
        )}
      </div>
      <button className="group/item flex h-11 items-center gap-3 rounded-md px-2 text-white/58 transition hover:text-white sm:hidden">
        <Search className="h-[18px] w-[18px] flex-none" />
      </button>
      <button className="group/item flex h-11 items-center gap-3 rounded-md px-2 text-white/58 transition hover:text-white sm:px-3">
        <Bell className="h-[18px] w-[18px] flex-none" />
        <span className="hidden origin-left whitespace-nowrap text-sm font-semibold transition group-hover/item:scale-110 sm:inline">Alerts</span>
      </button>
      <Link to="/profiles" className="group/item flex h-11 items-center gap-3 rounded-md px-2 text-white/58 transition hover:text-white sm:px-3">
        <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-sm bg-white/10">
          {profile?.avatar ? <img src={profile.avatar} className="h-full w-full object-cover" /> : <UserRound size={17} />}
        </span>
        <span className="hidden origin-left whitespace-nowrap text-sm font-semibold transition group-hover/item:scale-110 sm:inline">Profile</span>
      </Link>
    </header>
  );
}
