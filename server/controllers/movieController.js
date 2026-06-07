import Movie from '../models/Movie.js';
import User from '../models/User.js';

export const getMovies = async (req, res) => {
  const { search, genre, category, type } = req.query;
  const filter = {};
  if (genre) filter.genre = new RegExp(`^${genre}$`, 'i');
  if (category) filter.categories = category;
  if (type) filter.type = type;
  if (search) filter.$text = { $search: search };

  const movies = await Movie.find(filter).sort({ createdAt: -1 }).limit(80);
  res.json(movies);
};

export const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
};

export const getHomeRows = async (_req, res) => {
  const [featured, trending, action, comedy, sciFi, recent] = await Promise.all([
    Movie.findOne({ isFeatured: true }).sort({ createdAt: -1 }),
    Movie.find({ categories: 'Trending' }).sort({ createdAt: -1 }).limit(16),
    Movie.find({ genre: /action/i }).sort({ createdAt: -1 }).limit(16),
    Movie.find({ genre: /comedy/i }).sort({ createdAt: -1 }).limit(16),
    Movie.find({ genre: /sci-fi/i }).sort({ createdAt: -1 }).limit(16),
    Movie.find({}).sort({ createdAt: -1 }).limit(16)
  ]);

  res.json({
    featured,
    rows: [
      { title: 'Trending Movies', movies: trending },
      { title: 'Action Movies', movies: action },
      { title: 'Comedy Movies', movies: comedy },
      { title: 'Sci-Fi Movies', movies: sciFi },
      { title: 'Recently Added', movies: recent }
    ]
  });
};

export const getRecommendations = async (req, res) => {
  const user = await User.findById(req.user._id).populate('watchHistory.movie favorites');
  const watchedGenres = user.watchHistory.map((item) => item.movie?.genre).filter(Boolean);
  const favoriteGenres = user.favorites.map((movie) => movie.genre).filter(Boolean);
  const genres = [...new Set([...watchedGenres, ...favoriteGenres])];
  const watchedIds = user.watchHistory.map((item) => item.movie?._id).filter(Boolean);

  const recommendations = await Movie.find({
    _id: { $nin: watchedIds },
    ...(genres.length ? { genre: { $in: genres } } : { categories: 'Trending' })
  })
    .sort({ createdAt: -1 })
    .limit(18);

  res.json(recommendations);
};
