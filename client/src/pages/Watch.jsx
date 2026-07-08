import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { getCatalogMovies } from '../data/demoMovies';
import { useSelector } from 'react-redux';
import { api } from '../services/api';

export default function Watch() {
  const { id } = useParams();
  const rows = useSelector((state) => state.movies.rows);
  const [remoteMovie, setRemoteMovie] = useState(null);
  const all = [...rows.flatMap((row) => row.movies || []), ...getCatalogMovies()];
  const movie = remoteMovie || all.find((item) => item._id === id) || getCatalogMovies()[0];

  useEffect(() => {
    let active = true;
    const cached = all.find((item) => item._id === id);
    if (cached) {
      setRemoteMovie(null);
      return undefined;
    }
    api.get(`/movies/${id}`)
      .then(({ data }) => { if (active) setRemoteMovie(data); })
      .catch(() => {});
    return () => { active = false; };
  }, [id]);

  return (
    <div>
      <Link to="/" className="fixed left-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/60"><ArrowLeft /></Link>
      <VideoPlayer movie={movie} />
    </div>
  );
}
