import { Heart, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { demoMovies } from '../data/demoMovies';
import { toggleFavorite } from '../redux/slices/userSlice';

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.movies.rows);
  const all = [...demoMovies, ...rows.flatMap((row) => row.movies || [])];
  const movie = all.find((item) => item._id === id) || demoMovies[0];

  return (
    <section className="px-4 pb-10 sm:px-8">
      <div className="relative min-h-[62vh] overflow-hidden rounded-sm border border-white/10">
        <img src={movie.banner} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative z-10 max-w-3xl p-8 pt-28">
          <h1 className="text-5xl font-extrabold">{movie.title}</h1>
          <p className="mt-5 text-white/70">{movie.genre} · {movie.year} · {movie.duration} · {movie.rating}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{movie.description}</p>
          <div className="mt-8 flex gap-3">
            <Link to={`/watch/${movie._id}`} className="inline-flex h-12 items-center gap-3 rounded-sm bg-white px-6 font-bold text-ink"><Play fill="currentColor" /> Play</Link>
            <button onClick={() => dispatch(toggleFavorite(movie))} className="inline-flex h-12 items-center gap-3 rounded-sm bg-white/10 px-6 font-bold"><Heart /> Favorite</button>
          </div>
        </div>
      </div>
    </section>
  );
}
