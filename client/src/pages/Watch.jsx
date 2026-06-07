import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { demoMovies } from '../data/demoMovies';
import { useSelector } from 'react-redux';

export default function Watch() {
  const { id } = useParams();
  const rows = useSelector((state) => state.movies.rows);
  const movie = [...demoMovies, ...rows.flatMap((row) => row.movies || [])].find((item) => item._id === id) || demoMovies[0];
  return (
    <div>
      <Link to={`/movie/${movie._id}`} className="fixed left-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/60"><ArrowLeft /></Link>
      <VideoPlayer movie={movie} />
    </div>
  );
}
