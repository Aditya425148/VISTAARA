# OTT Streaming Platform

A production-ready Netflix-inspired OTT platform with React, Tailwind CSS, Redux Toolkit, Express, MongoDB Atlas, JWT authentication, bcrypt password hashing, Cloudinary media upload support, personalized profiles, watch progress, favorites, search, recommendations, and an admin dashboard.

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Copy environment files:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

3. Fill in MongoDB Atlas, JWT, and Cloudinary values in `server/.env`.

### Import movies from TMDB

Add your TMDB v3 API key as `TMDB_API_KEY` in `server/.env`. The importer saves posters, backdrops, overview, TMDB rating, cast, genres, release year, runtime, and a YouTube trailer link in MongoDB. It upserts by TMDB ID, so it is safe to run again and does not replace manually added movies.

Start small while testing:

```bash
npm run sync:tmdb --prefix server
```

Set `TMDB_SYNC_PAGES=500` in `server/.env` to import the full catalogue exposed by TMDB's Discover endpoint (up to 20 movies per page). To import only a later batch, set `TMDB_SYNC_START_PAGE` too (for example `TMDB_SYNC_START_PAGE=51` and `TMDB_SYNC_PAGES=75`). This takes a while because each movie is fetched with its cast and trailer while respecting the API rate limit.

For Bollywood/Hindi movie batches, set `TMDB_DISCOVER_ORIGINAL_LANGUAGE=hi`, `TMDB_DISCOVER_ORIGIN_COUNTRY=IN`, and `TMDB_DISCOVER_REGION=IN`. Reset `TMDB_SYNC_START_PAGE=1` to start the filtered catalogue from its first page.

To restrict a batch to movies released after 2015, also set `TMDB_DISCOVER_RELEASE_DATE_GTE=2016-01-01`.

For popular Bollywood releases from 2025 through today, set `TMDB_DISCOVER_ORIGINAL_LANGUAGE=hi`, `TMDB_DISCOVER_ORIGIN_COUNTRY=IN`, `TMDB_DISCOVER_REGION=IN`, and `TMDB_DISCOVER_RELEASE_DATE_GTE=2025-01-01`. Discover results are ordered by TMDB popularity and future releases are excluded automatically.

4. Run both apps:

```bash
npm run dev
```

Client: `http://localhost:5173`

Server: `http://localhost:5000`

## Deployment Notes

For Vercel + Render deployment:

- In Vercel, set `VITE_API_URL` to your Render API URL, for example `https://vistaara-backend.onrender.com/api`.
- In Vercel, set `VITE_GOOGLE_CLIENT_ID` to the same Google OAuth client ID used by the backend.
- In Render, set `CLIENT_URLS` to your Vercel frontend URL. Multiple URLs can be comma-separated. The server also accepts `*.vercel.app` preview origins.
- In Render, set `GOOGLE_CLIENT_ID`, `MONGO_URI`, and `JWT_SECRET`.
- In Google Cloud Console, add your Vercel frontend URL to the OAuth client Authorized JavaScript origins, for example `https://your-vercel-app.vercel.app`. Google Sign-In will fail until this exact origin is allowed.

## Demo Access

When the backend is not running, the frontend uses local demo auth so the UI remains explorable.

- User: any email/password with 6+ characters
- Admin UI route: `/admin`

Seeded backend credentials after `npm run seed --prefix server`:

- Admin: `admin@vistaara.dev` / `password`
- User: `viewer@vistaara.dev` / `password`
