import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

export default function History() {
  const history = useSelector((state) => state.user.history);
  return (
    <section className="px-4 sm:px-8">
      <h1 className="text-3xl font-extrabold">Recently Watched</h1>
      <div className="mt-8 flex flex-wrap gap-4">
        {history.map((item) => <MovieCard key={item.movie._id} movie={item.movie} />)}
      </div>
      {!history.length && <p className="mt-10 text-white/60">Your watch history will appear once you start streaming.</p>}
    </section>
  );
}
