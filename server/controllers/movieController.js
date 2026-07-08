import Movie from '../models/Movie.js';
import User from '../models/User.js';

const priorityMovieTitles = [
  'Emergency',
  'Hisaab Barabar',
  'Superboys of Malegaon',
  'Fateh',
  'Azaad',
  'Sky Force',
  'Chhaava',
  'The Diplomat',
  'Sikandar',
  'Jaat',
  'Kesari Chapter 2',
  'Ground Zero',
  'Raid 2',
  'Maalik',
  'War 2',
  'Bhool Chuk Maaf',
  'Housefull 5',
  'Maa',
  'Metro... In Dino',
  'Saiyaara',
  'Dhadak 2',
  'Son of Sardaar 2',
  'Baaghi 4',
  'Jolly LLB 3',
  'Kantara: Chapter 1',
  'Tere Ishk Mein',
  'Alpha',
  'Welcome to the Jungle'
];

const normalizeTitle = (title = '') => title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const escapeRegex = (value = '') => value.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&');
const priorityTitleSet = new Set(priorityMovieTitles.map(normalizeTitle));
const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'or', 'that', 'the', 'their', 'this',
  'to', 'was', 'when', 'where', 'while', 'who', 'with'
]);

const movieTags = (movie = {}) => [
  movie.description,
  movie.genre,
  ...(movie.genres || []),
  ...(movie.cast || [])
].filter(Boolean).join(' ');

const tokenize = (text = '') => text
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .split(/\s+/)
  .filter((word) => word.length > 1 && !stopWords.has(word));

const termFrequency = (tokens = []) => {
  const terms = new Map();
  tokens.forEach((token) => terms.set(token, (terms.get(token) || 0) + 1));
  return terms;
};

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

  if (!baseNorm || !candidateNorm) return 0;
  return dot / (Math.sqrt(baseNorm) * Math.sqrt(candidateNorm));
};

const getSimilarMovies = (baseMovie, movies = [], limit = 10) => {
  const baseTerms = termFrequency(tokenize(movieTags(baseMovie)));
  const baseTitle = normalizeTitle(baseMovie.title);
  const usedTitles = new Set([baseTitle]);

  return movies
    .filter((movie) => movie._id.toString() !== baseMovie._id.toString() && normalizeTitle(movie.title) !== baseTitle)
    .map((movie) => {
      const contentScore = cosineScore(baseTerms, termFrequency(tokenize(movieTags(movie))));
      const genreBoost = (movie.genres || [movie.genre])
        .filter(Boolean)
        .some((genre) => (baseMovie.genres || [baseMovie.genre]).includes(genre))
        ? 0.18
        : 0;
      const ratingBoost = Number(movie.voteAverage || 0) / 100;

      return {
        movie,
        score: contentScore + genreBoost + ratingBoost
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

const prioritizeMovies = (movies = []) => {
  const byTitle = new Map();
  movies.forEach((movie) => {
    const key = normalizeTitle(movie.title);
    if (!key) return;
    const current = byTitle.get(key);
    if (!current || Number(movie.year || 0) > Number(current.year || 0)) byTitle.set(key, movie);
  });

  const used = new Set();
  const priority = priorityMovieTitles
    .map((title) => byTitle.get(normalizeTitle(title)))
    .filter(Boolean)
    .map((movie) => {
      used.add(normalizeTitle(movie.title));
      return movie;
    });

  return [
    ...priority,
    ...movies.filter((movie) => !used.has(normalizeTitle(movie.title)))
  ];
};

export const getMovies = async (req, res) => {
  const { search, genre, category, type, limit } = req.query;

  const filter = {};

  if (genre) filter.genre = new RegExp('^' + escapeRegex(genre) + '$', 'i');
  if (category) filter.categories = category;
  if (type) filter.type = type;
  if (search) filter.$text = { $search: search };

  const requestedLimit = Number.parseInt(limit, 10);

  const resultLimit = Math.min(
    Math.max(requestedLimit || 5000, 1),
    5000
  );

  const movies = await Movie.find(filter)
    .sort({ tmdbLastSyncedAt: -1, createdAt: -1 })
    .limit(resultLimit);

  res.json(movies);
};

export const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).json({
      message: 'Movie not found'
    });
  }

  res.json(movie);
};

export const getSimilarMoviesById = async (req, res) => {
  const baseMovie = await Movie.findById(req.params.id).lean();

  if (!baseMovie) {
    return res.status(404).json({
      message: 'Movie not found'
    });
  }

  const requestedLimit = Number.parseInt(req.query.limit, 10);
  const limit = Math.min(Math.max(requestedLimit || 10, 1), 20);
  const movies = await Movie.find({
    type: baseMovie.type || 'movie'
  })
    .sort({ tmdbLastSyncedAt: -1, createdAt: -1 })
    .limit(5000)
    .lean();

  res.json(getSimilarMovies(baseMovie, movies, limit));
};

export const getHomeRows = async (_req, res) => {
  try {
    const priorityMovies = await Movie.find({
      type: 'movie',
      $or: priorityMovieTitles.map((title) => ({
        title: new RegExp('^' + escapeRegex(title) + '$', 'i')
      }))
    }).lean();

    const recentMovies = await Movie.find({ type: 'movie' })
      .sort({ tmdbLastSyncedAt: -1, createdAt: -1 })
      .limit(500)
      .lean();

    const seenIds = new Set();
    const movies = [...priorityMovies, ...recentMovies].filter((movie) => {
      const id = movie._id.toString();
      if (seenIds.has(id)) return false;
      seenIds.add(id);
      return true;
    });

    const recommendedMovies = prioritizeMovies(movies);
    const trendingMovies = prioritizeMovies(
      movies.filter((movie) => movie.categories?.includes('Trending') || priorityTitleSet.has(normalizeTitle(movie.title)))
    );

    const featured =
      trendingMovies.find((movie) => movie.isFeatured) ||
      trendingMovies[0] ||
      recommendedMovies[0] ||
      null;

    res.json({
      featured,
      rows: [
        { title: 'Recommended for you', movies: recommendedMovies },
        { title: 'Trending Movies', movies: trendingMovies }
      ]
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getRecommendations = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('watchHistory.movie favorites');

  const watchedGenres = user.watchHistory
    .map((item) => item.movie?.genre)
    .filter(Boolean);

  const favoriteGenres = user.favorites
    .map((movie) => movie.genre)
    .filter(Boolean);

  const genres = [
    ...new Set([
      ...watchedGenres,
      ...favoriteGenres
    ])
  ];

  const watchedIds = user.watchHistory
    .map((item) => item.movie?._id)
    .filter(Boolean);

  const recommendations = await Movie.find({
    _id: { $nin: watchedIds },
    ...(genres.length
      ? { genre: { $in: genres } }
      : {})
  })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(recommendations);
};
