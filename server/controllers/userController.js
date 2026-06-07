import User from '../models/User.js';

const activeProfile = (user, profileId) =>
  profileId ? user.profiles.id(profileId) : null;

export const toggleFavorite = async (req, res) => {
  const { movieId, profileId } = req.body;
  const user = await User.findById(req.user._id);
  const target = activeProfile(user, profileId);
  const favorites = target ? target.favorites : user.favorites;
  const exists = favorites.some((id) => id.toString() === movieId);

  if (exists) {
    const next = favorites.filter((id) => id.toString() !== movieId);
    target ? (target.favorites = next) : (user.favorites = next);
  } else {
    favorites.push(movieId);
  }

  await user.save();
  res.json({ favorites: target ? target.favorites : user.favorites });
};

export const getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites profiles.favorites');
  const profile = activeProfile(user, req.query.profileId);
  res.json(profile ? profile.favorites : user.favorites);
};

export const saveProgress = async (req, res) => {
  const { movieId, progress, duration, profileId } = req.body;
  const user = await User.findById(req.user._id);
  const target = activeProfile(user, profileId);
  const history = target ? target.watchHistory : user.watchHistory;
  const existing = history.find((item) => item.movie.toString() === movieId);

  if (existing) {
    existing.progress = progress;
    existing.duration = duration;
    existing.watchedAt = new Date();
  } else {
    history.push({ movie: movieId, progress, duration, watchedAt: new Date() });
  }

  await user.save();
  res.json({ watchHistory: history });
};

export const getHistory = async (req, res) => {
  const user = await User.findById(req.user._id).populate('watchHistory.movie profiles.watchHistory.movie');
  const profile = activeProfile(user, req.query.profileId);
  const history = profile ? profile.watchHistory : user.watchHistory;
  res.json(history.sort((a, b) => b.watchedAt - a.watchedAt));
};
