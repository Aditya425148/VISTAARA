import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const favorites = useSelector((state) => state.user.favorites);
  return (
    <section className="px-4 sm:px-8">
      <h1 className="text-3xl font-extrabold">My Favorites</h1>
      <div className="mt-8 flex flex-wrap gap-4">
        {favorites.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
      </div>
      {!favorites.length && <p className="mt-10 text-white/60">Your saved movies will appear here.</p>}
    </section>
  );
}
