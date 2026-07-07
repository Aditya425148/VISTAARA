import { setDefaultResultOrder } from 'node:dns';

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

// Some networks resolve TMDB to IPv6 first while Node's fetch cannot establish
// that route. Prefer IPv4 but retain DNS fallback when IPv4 is unavailable.
setDefaultResultOrder('ipv4first');

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const tmdbRequest = async (path, params = {}, attempt = 0) => {
  if (!process.env.TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is missing. Add it to server/.env before syncing.');
  }

  const url = new URL(`${TMDB_API_BASE}${path}`);
  url.search = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    language: process.env.TMDB_LANGUAGE || 'en-US',
    ...params
  }).toString();

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    const code = error.cause?.code || error.cause?.message || error.message;
    // A socket reset is transient; retry it just like a 429/5xx response.
    if (attempt < 4 && ['ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN'].includes(error.cause?.code)) {
      await wait(2 ** attempt * 1000);
      return tmdbRequest(path, params, attempt + 1);
    }
    throw new Error(`Could not reach TMDB: ${code}`);
  }
  if (response.ok) return response.json();

  // TMDB reports a retry delay for rate limiting. Retry transient errors only.
  if ((response.status === 429 || response.status >= 500) && attempt < 4) {
    const retryAfter = Number(response.headers.get('retry-after')) || 2 ** attempt;
    await wait(retryAfter * 1000);
    return tmdbRequest(path, params, attempt + 1);
  }

  const error = await response.json().catch(() => ({}));
  throw new Error(error.status_message || `TMDB request failed (${response.status})`);
};

export const getDiscoverMovies = (page) => tmdbRequest('/discover/movie', {
  page,
  include_adult: 'false',
  include_video: 'false',
  sort_by: 'popularity.desc',
  ...(process.env.TMDB_DISCOVER_ORIGINAL_LANGUAGE
    ? { with_original_language: process.env.TMDB_DISCOVER_ORIGINAL_LANGUAGE }
    : {}),
  ...(process.env.TMDB_DISCOVER_ORIGIN_COUNTRY
    ? { with_origin_country: process.env.TMDB_DISCOVER_ORIGIN_COUNTRY }
    : {}),
  ...(process.env.TMDB_DISCOVER_REGION ? { region: process.env.TMDB_DISCOVER_REGION } : {}),
  ...(process.env.TMDB_DISCOVER_RELEASE_DATE_GTE
    ? { 'primary_release_date.gte': process.env.TMDB_DISCOVER_RELEASE_DATE_GTE }
    : {}),
  ...(process.env.TMDB_DISCOVER_RELEASE_DATE_GTE
    ? {
      'primary_release_date.lte': process.env.TMDB_DISCOVER_RELEASE_DATE_LTE
        || new Date().toISOString().slice(0, 10)
    }
    : {})
});

export const getMovieDetails = (tmdbId) => tmdbRequest(`/movie/${tmdbId}`, {
  append_to_response: 'credits,videos'
});

export const imageUrl = (path) => (path ? `${IMAGE_BASE}${path}` : '');

export const mapTmdbMovie = (movie) => {
  const trailer = (movie.videos?.results || []).find((video) => (
    video.site === 'YouTube' && video.type === 'Trailer' && video.official
  )) || (movie.videos?.results || []).find((video) => video.site === 'YouTube' && video.type === 'Trailer');
  const genreNames = (movie.genres || []).map((genre) => genre.name);
  const releaseDate = movie.release_date || '';
  const runtime = Number(movie.runtime) || 0;

  return {
    tmdbId: movie.id,
    title: movie.title,
    description: movie.overview || 'Description is not available yet.',
    genre: genreNames[0] || 'Other',
    genres: genreNames,
    categories: [
      'TMDB',
      'Trending',
      ...(process.env.TMDB_DISCOVER_ORIGINAL_LANGUAGE === 'hi' ? ['Bollywood'] : [])
    ],
    thumbnail: imageUrl(movie.poster_path) || imageUrl(movie.backdrop_path),
    banner: imageUrl(movie.backdrop_path) || imageUrl(movie.poster_path),
    posterPath: movie.poster_path || '',
    backdropPath: movie.backdrop_path || '',
    videoUrl: '',
    trailerKey: trailer?.key || '',
    trailerUrl: trailer?.key ? `https://www.youtube.com/watch?v=${trailer.key}` : '',
    duration: runtime ? `${runtime} min` : 'N/A',
    durationSeconds: runtime * 60,
    year: Number(releaseDate.slice(0, 4)) || new Date().getFullYear(),
    releaseDate,
    rating: movie.adult ? 'R' : 'PG-13',
    voteAverage: Number((movie.vote_average || 0).toFixed(1)),
    voteCount: movie.vote_count || 0,
    cast: (movie.credits?.cast || []).slice(0, 12).map((person) => person.name),
    type: 'movie',
    source: 'tmdb',
    tmdbLastSyncedAt: new Date()
  };
};
