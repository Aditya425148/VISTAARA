import { Heart, Play, Star, Tv, Users, Youtube } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogMovies } from '../data/demoMovies';
import MovieRow from '../components/MovieRow';
import { toggleFavorite } from '../redux/slices/userSlice';
import { api } from '../services/api';

const stopWords = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'this', 'to', 'was', 'when', 'where', 'while', 'who', 'with']);
const normalizeTitle = (title = '') => title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const uniqueByTitle = (movies = []) => {
  const used = new Set();
  return movies.filter((movie) => {
    const title = normalizeTitle(movie.title);
    if (!title || used.has(title)) return false;
    used.add(title);
    return true;
  });
};

const tagsFor = (movie = {}) => [
  movie.description,
  movie.genre,
  ...(movie.genres || []),
  ...(movie.cast || [])
].filter(Boolean).join(' ');

const tokenCounts = (text = '') => text
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .split(/\s+/)
  .filter((word) => word.length > 1 && !stopWords.has(word))
  .reduce((counts, word) => counts.set(word, (counts.get(word) || 0) + 1), new Map());

const cosineScore = (baseTerms, candidateTerms) => {
  let dot = 0;
  let baseNorm = 0;
  let candidateNorm = 0;

  baseTerms.forEach((value, term) => {
    baseNorm += value * value;
    dot += value * (candidateTerms.get(term) || 0);
  });
  candidateTerms.forEach((value) => {
    candidateNorm += value * value;
  });

  return baseNorm && candidateNorm ? dot / (Math.sqrt(baseNorm) * Math.sqrt(candidateNorm)) : 0;
};

const getLocalSimilarMovies = (baseMovie, movies = [], limit = 10) => {
  const baseGenres = baseMovie.genres?.length ? baseMovie.genres : [baseMovie.genre].filter(Boolean);
  const baseTerms = tokenCounts(tagsFor(baseMovie));
  const baseTitle = normalizeTitle(baseMovie.title);
  const usedTitles = new Set([baseTitle]);

  return movies
    .filter((movie) => movie._id !== baseMovie._id && movie.type === baseMovie.type && normalizeTitle(movie.title) !== baseTitle)
    .map((movie) => {
      const genres = movie.genres?.length ? movie.genres : [movie.genre].filter(Boolean);
      const genreBoost = genres.some((genre) => baseGenres.includes(genre)) ? 0.18 : 0;
      return {
        movie,
        score: cosineScore(baseTerms, tokenCounts(tagsFor(movie))) + genreBoost + Number(movie.voteAverage || 0) / 100
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .filter((item) => {
      const title = normalizeTitle(item.movie.title);
      if (!title || usedTitles.has(title)) return false;
      usedTitles.add(title);
      return true;
    })
    .slice(0, limit)
    .map((item) => item.movie);
};

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.movies.rows);
  const [remoteMovie, setRemoteMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const all = useMemo(() => uniqueByTitle([...rows.flatMap((row) => row.movies || []), ...getCatalogMovies()]), [rows]);
  const movie = remoteMovie || all.find((item) => item._id === id) || getCatalogMovies()[0];
  const episodes = movie.type === 'series' ? movie.episodes || [] : [];
  const episodeCount = episodes.length || movie.episodeCount;
  const genres = movie.genres?.length ? movie.genres : String(movie.genre || '').split(',').map((genre) => genre.trim()).filter(Boolean);
  const score = Number(movie.voteAverage || movie.vote_average || 0);

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
  }, [all, id]);

  useEffect(() => {
    let active = true;
    const localSimilar = getLocalSimilarMovies(movie, all, 10);

    api.get(`/movies/${id}/similar`, { params: { limit: 10 } })
      .then(({ data }) => {
        if (active) setSimilarMovies(data?.length ? uniqueByTitle(data) : localSimilar);
      })
      .catch(() => {
        if (active) setSimilarMovies(localSimilar);
      });

    return () => { active = false; };
  }, [all, id, movie]);

  return (
    <section className="px-4 pb-12 sm:px-8">
      <div className="relative min-h-[62vh] overflow-hidden rounded-sm border border-white/10 bg-ink">
        <img src={movie.banner} alt="" className="absolute inset-0 h-full w-full object-cover object-[68%_35%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/86 to-ink/18" />
        <div className="relative z-10 max-w-3xl p-8 pt-28">
          <p className="text-sm font-bold uppercase tracking-[.28em] text-white/52">{movie.type === 'series' ? 'Web Series' : 'Movie'}</p>
          <h1 className="mt-4 text-5xl font-extrabold">{movie.title}</h1>
          <p className="mt-5 text-white/70">
            {movie.genre} · {movie.year} · {movie.duration} · {movie.rating}
            {episodeCount ? ` · ${episodeCount} Episodes` : ''}
          </p>
          {(score > 0 || genres.length > 0) && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {score > 0 && <span className="inline-flex items-center gap-1.5 rounded-sm bg-amber-400/15 px-3 py-1.5 text-sm font-bold text-amber-200"><Star size={15} fill="currentColor" /> {score.toFixed(1)} <span className="font-medium text-amber-100/60">TMDB</span></span>}
              {genres.map((genre) => <span key={genre} className="rounded-sm bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/78">{genre}</span>)}
            </div>
          )}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{movie.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {movie.videoUrl ? (
              <Link to={`/watch/${movie._id}`} className="inline-flex h-12 items-center gap-3 rounded-sm bg-white px-6 font-bold text-ink"><Play fill="currentColor" /> Play</Link>
            ) : movie.trailerUrl ? (
              <a href={movie.trailerUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-3 rounded-sm bg-white px-6 font-bold text-ink"><Youtube /> Watch trailer</a>
            ) : null}
            <button onClick={() => dispatch(toggleFavorite(movie))} className="inline-flex h-12 items-center gap-3 rounded-sm bg-white/10 px-6 font-bold"><Heart /> Favorite</button>
          </div>
        </div>
      </div>

      {movie.cast?.length > 0 && (
        <div className="mt-8 rounded-sm border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-white/52"><Users size={18} /><p className="text-sm font-semibold uppercase tracking-[.22em]">Cast</p></div>
          <div className="mt-4 flex flex-wrap gap-2">
            {movie.cast.map((person) => <span key={person} className="rounded-sm bg-white/10 px-3 py-2 text-sm font-semibold text-white/82">{person}</span>)}
          </div>
        </div>
      )}

      <MovieRow title="More like this" movies={similarMovies} />

      {movie.type === 'series' && (
        <div className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[.26em] text-white/42">Episodes</p>
              <h2 className="mt-2 text-2xl font-black text-white/90">{episodeCount || 0} episodes available</h2>
            </div>
            <span className="hidden rounded-sm bg-white/10 px-4 py-2 text-sm font-semibold text-white/68 sm:inline-flex">Season 1</span>
          </div>

          <div className="grid gap-3">
            {episodes.length ? episodes.map((episode) => (
              <Link key={episode.number} to={`/watch/${movie._id}`} className="group flex gap-4 rounded-sm border border-white/10 bg-white/[0.04] p-3 transition hover:border-white/24 hover:bg-white/[0.08]">
                <div className="grid h-16 w-16 flex-none place-items-center rounded-sm bg-white/10 text-lg font-black text-white/72">{episode.number}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-bold text-white/88">{episode.title}</h3>
                    <span className="text-xs font-semibold text-white/42">{episode.duration}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/56">{episode.description}</p>
                </div>
                <span className="hidden h-10 w-10 place-items-center rounded-full bg-white text-ink transition group-hover:scale-105 sm:grid"><Play size={16} fill="currentColor" /></span>
              </Link>
            )) : (
              <div className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/[0.04] p-4 text-white/62">
                <Tv size={20} /> Episode details will be added soon.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
