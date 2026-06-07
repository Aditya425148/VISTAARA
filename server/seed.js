import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Movie from './models/Movie.js';

dotenv.config();
await connectDB();

const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
const demoVideo = 'https://res.cloudinary.com/demo/video/upload/dog.mp4';

await Movie.deleteMany();
await Movie.insertMany([
  {
    title: 'Lost in Space 2',
    description: 'A stranded family crosses a frozen alien world while a quiet signal rewrites their mission.',
    genre: 'Sci-Fi',
    categories: ['Trending', 'Featured'],
    thumbnail: image('photo-1534447677768-be436bb09401'),
    banner: image('photo-1446776811953-b23d57bd21aa'),
    videoUrl: demoVideo,
    duration: '2h 12m',
    year: 2026,
    rating: 'TV-14',
    isFeatured: true
  },
  {
    title: 'Neon Pursuit',
    description: 'A courier with a stolen drive becomes the target of every syndicate in the city.',
    genre: 'Action',
    categories: ['Trending'],
    thumbnail: image('photo-1519608487953-e999c86e7455'),
    banner: image('photo-1500530855697-b586d89ba3ee'),
    videoUrl: demoVideo,
    duration: '1h 48m',
    year: 2025,
    rating: 'PG-13'
  }
]);

console.log('Seeded demo movies');
process.exit(0);
