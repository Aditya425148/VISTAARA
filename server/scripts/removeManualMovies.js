import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Movie from '../models/Movie.js';

dotenv.config();

try {
  await connectDB();
  const result = await Movie.deleteMany({
    $or: [
      { source: 'manual' },
      { source: { $exists: false } }
    ]
  });
  console.log(`Removed ${result.deletedCount} manually added movie(s). TMDB movies were kept.`);
} catch (error) {
  console.error(`Could not remove manual movies: ${error.message}`);
  process.exitCode = 1;
} finally {
  await Movie.db.close();
}
