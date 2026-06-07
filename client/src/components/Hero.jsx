import { Play, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/userSlice';

export default function Hero({ movie }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);
  if (!movie) return <div className="h-[68vh] skeleton" />;
  const saved = favorites.some((item) => item._id === movie._id);

  return (
    <section className="relative min-h-[650px] overflow-hidden">
      <img src={movie.banner} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080d] via-[#07080d]/78 to-[#07080d]/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/52 via-transparent to-ink" />
      <div className="relative z-10 flex min-h-[650px] max-w-2xl flex-col justify-center px-7 pb-32 pt-28 sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[.28em] text-white/52">Vistaara Original</p>
        <h1 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[.88] tracking-normal text-white/70 sm:text-7xl">{movie.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-bold text-white/68">
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
          <span>English</span>
          <span className="rounded-sm bg-white/12 px-2 py-1">{movie.rating}</span>
        </div>
        <p className="mt-5 max-w-lg text-sm leading-6 text-white/68 sm:text-base">{movie.description}</p>
        <p className="mt-6 text-sm font-semibold text-white/68">{movie.genre} | Trending</p>
        <div className="mt-8 flex gap-3">
          <Link to={`/watch/${movie._id}`} className="inline-flex h-12 w-64 items-center justify-center gap-3 rounded-md bg-white/12 px-6 text-sm font-bold text-white backdrop-blur transition hover:scale-[1.03] hover:bg-white/18"><Play size={18} fill="currentColor" /> Watch Now</Link>
          <button onClick={() => dispatch(toggleFavorite(movie))} className="grid h-12 w-12 place-items-center rounded-md bg-white/12 transition hover:scale-110 hover:bg-white/18" aria-label={saved ? 'Remove from list' : 'Add to list'}><Plus size={20} /></button>
        </div>
      </div>
      <div className="absolute bottom-56 right-6 z-10 hidden gap-3 xl:flex">
        {[movie.thumbnail, movie.banner, movie.thumbnail].map((src, index) => (
          <Link key={index} to={`/movie/${movie._id}`} className={`h-12 overflow-hidden rounded-sm border object-cover transition hover:scale-105 ${index === 0 ? 'w-20 border-white' : 'w-16 border-white/20'}`}>
            <img src={src} className="h-full w-full object-cover" />
          </Link>
        ))}
      </div>
    </section>
  );
}
