import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    genre: { type: String, required: true, index: true },
    categories: [{ type: String, index: true }],
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
    videoUrl: { type: String, required: true },
    duration: { type: String, required: true },
    durationSeconds: { type: Number, default: 0 },
    year: { type: Number, required: true },
    rating: { type: String, default: 'PG-13' },
    type: { type: String, enum: ['movie', 'series'], default: 'movie' },
    cast: [String],
    isFeatured: { type: Boolean, default: false },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

movieSchema.index({ title: 'text', genre: 'text', description: 'text' });

export default mongoose.model('Movie', movieSchema);
