import { useEffect, useState } from 'react';
import MovieRow from '../components/MovieRow';
import { buildRows } from '../data/demoMovies';
import { api } from '../services/api';

const copy = {
  movie: {
    title: 'Movies',
    subtitle: 'Big-screen stories, action hits, sci-fi worlds, drama, and comedy in one place.',
    empty: 'No movies available yet.'
  },
  series: {
    title: 'Web Series',
    subtitle: 'Binge-worthy shows, crime stories, thrillers, and sci-fi series ready to watch.',
    empty: 'No web series available yet.'
  }
};

export default function Browse({ type = 'movie' }) {
  const page = copy[type] || copy.movie;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const rows = buildRows(items).filter((row) => row.movies.length);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/movies', { params: { type, limit: 500 } });
        if (active) setItems(data);
      } catch {
        if (active) {
          setItems([]);
          setError('Could not load the movie catalog. Please sign in again and make sure the backend is running.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [type]);

  return (
    <div className="min-h-screen bg-[#07080d] px-5 pb-16 pt-28 sm:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[.28em] text-white/42">Browse</p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-normal text-white/88 sm:text-6xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/58 sm:text-base">{page.subtitle}</p>
      </section>
      <div className="mt-8">
        {loading && <div className="grid grid-cols-2 gap-4 md:grid-cols-5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-64 rounded-sm skeleton" />)}</div>}
        {!loading && rows.length ? rows.map((row) => <MovieRow key={row.title} title={row.title} movies={row.movies} />) : null}
        {!loading && error && <p className="text-amber-200/80">{error}</p>}
        {!loading && !rows.length && <p className="text-white/58">{page.empty}</p>}
      </div>
    </div>
  );
}
