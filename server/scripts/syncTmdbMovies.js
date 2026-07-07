import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Movie from '../models/Movie.js';
import { getDiscoverMovies, getMovieDetails, mapTmdbMovie } from '../services/tmdbService.js';

dotenv.config();

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const requestedPages = Number(process.env.TMDB_SYNC_PAGES || 1);
const requestedStartPage = Number(process.env.TMDB_SYNC_START_PAGE || 1);
const MAX_DISCOVER_PAGES = 500;

const sync = async () => {
  if (!process.env.TMDB_API_KEY) throw new Error('TMDB_API_KEY is missing in server/.env');

  await connectDB();
  const startPage = Math.min(Math.max(requestedStartPage, 1), MAX_DISCOVER_PAGES);
  const firstPage = await getDiscoverMovies(startPage);
  const pages = Math.min(Math.max(requestedPages, startPage), MAX_DISCOVER_PAGES, firstPage.total_pages || 1);
  let imported = 0;
  let failed = 0;

  for (let page = startPage; page <= pages; page += 1) {
    const discovery = page === startPage ? firstPage : await getDiscoverMovies(page);
    console.log(`Syncing page ${page}/${pages} (${discovery.results.length} movies)`);

    for (const result of discovery.results) {
      try {
        const details = await getMovieDetails(result.id);
        const movie = mapTmdbMovie(details);
        if (!movie.thumbnail || !movie.banner) {
          console.log(`Skipping ${movie.title}: TMDB has no usable image.`);
          continue;
        }
        await Movie.findOneAndUpdate(
          { tmdbId: movie.tmdbId },
          { $set: movie, $setOnInsert: { isFeatured: false } },
          { new: true, upsert: true, runValidators: true }
        );
        imported += 1;
        // Keeps requests comfortably under TMDB's standard rate limit.
        await delay(275);
      } catch (error) {
        failed += 1;
        console.error(`Could not sync TMDB movie ${result.id}: ${error.message}`);
      }
    }
  }

  console.log(`TMDB sync finished. Saved: ${imported}, failed: ${failed}.`);
};

sync()
  .catch((error) => { console.error(error.message); process.exitCode = 1; })
  .finally(async () => { await Movie.db.close(); });
