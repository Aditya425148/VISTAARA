const img = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const video = 'https://res.cloudinary.com/demo/video/upload/dog.mp4';

export const demoMovies = [
  {
    _id: 'lost-space',
    title: 'Lost in Space 2',
    description: 'A brave crew enters a glacial alien tunnel system after a distress signal starts broadcasting from beneath the ice.',
    genre: 'Sci-Fi',
    categories: ['Trending', 'Recently Added'],
    thumbnail: img('photo-1534447677768-be436bb09401', 600),
    banner: img('photo-1446776811953-b23d57bd21aa'),
    videoUrl: video,
    duration: '2h 12m',
    durationSeconds: 7920,
    year: 2026,
    rating: 'TV-14',
    isFeatured: true
  },
  {
    _id: 'iron-vow',
    title: 'Iron Vow',
    description: 'A retired weapons engineer returns to the field when an experimental suit goes missing.',
    genre: 'Action',
    categories: ['Trending'],
    thumbnail: img('photo-1519608487953-e999c86e7455', 600),
    banner: img('photo-1500530855697-b586d89ba3ee'),
    videoUrl: video,
    duration: '1h 56m',
    durationSeconds: 6960,
    year: 2025,
    rating: 'PG-13'
  },
  {
    _id: 'midnight-cafe',
    title: 'Midnight Cafe',
    description: 'Three friends try to save their late-night diner with increasingly questionable ideas.',
    genre: 'Comedy',
    categories: ['Recently Added'],
    thumbnail: img('photo-1529156069898-49953e39b3ac', 600),
    banner: img('photo-1517248135467-4c7edcad34c4'),
    videoUrl: video,
    duration: '1h 38m',
    durationSeconds: 5880,
    year: 2024,
    rating: 'PG'
  },
  {
    _id: 'quantum-dr',
    title: 'Doctor Quantum',
    description: 'A surgeon discovers a parallel city hidden in the seconds between heartbeats.',
    genre: 'Sci-Fi',
    categories: ['Trending'],
    thumbnail: img('photo-1451187580459-43490279c0fa', 600),
    banner: img('photo-1462331940025-496dfbfc7564'),
    videoUrl: video,
    duration: '2h 05m',
    durationSeconds: 7500,
    year: 2025,
    rating: 'PG-13'
  },
  {
    _id: 'black-panther-city',
    title: 'Panther City',
    description: 'An heir to a hidden kingdom must choose between secrecy and saving the world outside.',
    genre: 'Action',
    categories: ['Trending'],
    thumbnail: img('photo-1518709268805-4e9042af2176', 600),
    banner: img('photo-1500534314209-a25ddb2bd429'),
    videoUrl: video,
    duration: '2h 08m',
    durationSeconds: 7680,
    year: 2026,
    rating: 'PG-13'
  },
  {
    _id: 'orbit-hearts',
    title: 'Orbit Hearts',
    description: 'A station mechanic and a diplomat fake an alliance and accidentally start a revolution.',
    genre: 'Comedy',
    categories: ['Recently Added'],
    thumbnail: img('photo-1444703686981-a3abbc4d4fe3', 600),
    banner: img('photo-1446776858070-70c3d5ed6758'),
    videoUrl: video,
    duration: '1h 44m',
    durationSeconds: 6240,
    year: 2025,
    rating: 'TV-PG'
  }
];

export const buildRows = (movies = demoMovies) => [
  { title: 'Recommended for you', movies },
  { title: 'Trending Movies', movies: movies.filter((m) => m.categories?.includes('Trending')) },
  { title: 'Action Movies', movies: movies.filter((m) => m.genre === 'Action') },
  { title: 'Comedy Movies', movies: movies.filter((m) => m.genre === 'Comedy') },
  { title: 'Sci-Fi Movies', movies: movies.filter((m) => m.genre === 'Sci-Fi') },
  { title: 'Recently Added', movies: movies.filter((m) => m.categories?.includes('Recently Added')) }
];
