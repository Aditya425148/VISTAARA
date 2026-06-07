import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { fetchHome } from '../redux/slices/movieSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { featured, rows, loading } = useSelector((state) => state.movies);
  const { history } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  const continueWatching = history.filter((item) => item.progress > 10).map((item) => item.movie);

  return (
    <div className="bg-[#07080d]">
      <Hero movie={featured} />
      <div className="-mt-28 pb-12">
        {rows.find((row) => row.title.includes('Trending')) && <MovieRow title="Latest & Trending" movies={rows.find((row) => row.title.includes('Trending')).movies} />}
        {continueWatching.length > 0 && <MovieRow title="Continue Watching" movies={continueWatching} />}
        {loading && <div className="mx-8 mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-64 rounded-sm skeleton" />)}</div>}
        {rows.filter((row) => !row.title.includes('Trending')).map((row) => <MovieRow key={row.title} title={row.title} movies={row.movies} />)}
      </div>
    </div>
  );
}
