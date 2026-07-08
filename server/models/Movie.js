import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    videoUrl: { type: String, default: '' }
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    genre: { type: String, required: true, index: true },
    categories: [{ type: String, index: true }],
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
    videoUrl: { type: String, default: '' },
    duration: { type: String, required: true },
    durationSeconds: { type: Number, default: 0 },
    year: { type: Number, required: true },
    rating: { type: String, default: 'PG-13' },
    type: { type: String, enum: ['movie', 'series'], default: 'movie' },
    episodeCount: { type: Number, default: 0 },
    episodes: [episodeSchema],
    cast: [String],
    // TMDB fields. Existing manually-created movies can leave these empty.
    tmdbId: { type: Number, unique: true, sparse: true, index: true },
    genres: [{ type: String, index: true }],
    posterPath: { type: String, default: '' },
    backdropPath: { type: String, default: '' },
    releaseDate: { type: String, default: '' },
    voteAverage: { type: Number, default: 0 },
    voteCount: { type: Number, default: 0 },
    trailerUrl: { type: String, default: '' },
    trailerKey: { type: String, default: '' },
    source: { type: String, enum: ['manual', 'tmdb'], default: 'manual', index: true },
    tmdbLastSyncedAt: { type: Date },
    isFeatured: { type: Boolean, default: false },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

movieSchema.index({ title: 'text', genre: 'text', description: 'text' });

export default mongoose.model('Movie', movieSchema);
