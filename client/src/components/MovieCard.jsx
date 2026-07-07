import { Heart, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/userSlice';

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const posterClass = movie.thumbnailFit === 'contain'
    ? 'object-contain p-2'
    : 'object-cover group-hover:scale-110';
  const favorites = useSelector((state) => state.user.favorites);
  const saved = favorites.some((item) => item._id === movie._id);

  return (
    <article className="group relative h-48 w-36 flex-none overflow-hidden rounded-sm bg-white/5 shadow-lg transition duration-300 hover:z-20 hover:scale-105 sm:h-56 sm:w-40 md:h-64 md:w-48">
      <Link to={`/movie/${movie._id}`} className="absolute inset-0 z-10" aria-label={`View details for ${movie.title}`} />
      <img src={movie.thumbnail} alt="" className={"h-full w-full bg-black transition duration-500 " + posterClass} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="line-clamp-2 text-sm font-bold">{movie.title}</h3>
        <p className="mt-1 text-xs text-white/62">{movie.genre} · {movie.year}</p>
        <div className="mt-3 flex translate-y-4 gap-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <Link to={`/watch/${movie._id}`} className="relative z-20 grid h-9 w-9 place-items-center rounded-full bg-white text-ink"><Play size={16} fill="currentColor" /></Link>
          <button onClick={() => dispatch(toggleFavorite(movie))} className={`relative z-20 grid h-9 w-9 place-items-center rounded-full ${saved ? 'bg-ember' : 'bg-white/18'}`}><Heart size={16} fill={saved ? 'currentColor' : 'none'} /></button>
        </div>
      </div>
    </article>
  );
}
