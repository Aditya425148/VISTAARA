import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies }) {
  const ref = useRef(null);
  if (!movies?.length) return null;
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 620, behavior: 'smooth' });

  return (
    <section className="relative z-10 mt-8">
      <div className="mb-3 flex items-center justify-between px-5 sm:px-8">
        <h2 className="text-lg font-extrabold text-white/88">{title}</h2>
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => scroll(-1)} className="grid h-9 w-9 place-items-center rounded-sm bg-white/10 hover:bg-white/20"><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} className="grid h-9 w-9 place-items-center rounded-sm bg-white/10 hover:bg-white/20"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div ref={ref} className="scrollbar-none flex gap-2.5 overflow-x-auto px-5 pb-3 sm:px-8">
        {movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
      </div>
    </section>
  );
}
