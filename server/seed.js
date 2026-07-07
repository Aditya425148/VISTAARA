import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Movie from './models/Movie.js';
import User from './models/User.js';

dotenv.config();
await connectDB();

const demoVideo = 'https://res.cloudinary.com/demo/video/upload/dog.mp4';

await Movie.deleteMany();
await User.deleteMany({ email: { $in: ['admin@vistaara.dev', 'viewer@vistaara.dev'] } });
await User.create([
  {
    name: 'Vistaara Admin',
    email: 'admin@vistaara.dev',
    password: 'password',
    role: 'admin',
    profiles: [{ name: 'Admin', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Admin' }]
  },
  {
    name: 'Vistaara Viewer',
    email: 'viewer@vistaara.dev',
    password: 'password',
    role: 'user',
    profiles: [{ name: 'Viewer', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Viewer' }]
  }
]);
await Movie.insertMany([
  {
    title: 'Lost in Space 2',
    description: 'A stranded family crosses a frozen alien world while a quiet signal rewrites their mission.',
    genre: 'Sci-Fi',
    type: 'series',
    categories: ['Trending', 'Featured'],
    thumbnail: '/lost-in-space-2.jpg',
    banner: '/banners/lost-in-space.jpg',
    videoUrl: demoVideo,
    duration: '2h 12m',
    year: 2026,
    rating: 'TV-14',
    episodeCount: 8,
    episodes: [
      { number: 1, title: 'Signal Under Ice', duration: '48m', description: 'The crew follows a strange transmission into frozen alien tunnels.' },
      { number: 2, title: 'Whiteout', duration: '45m', description: 'A storm cuts the team off while a hidden engine begins to wake.' },
      { number: 3, title: 'Orbit Break', duration: '51m', description: 'A rescue plan turns risky when the planet starts shifting beneath them.' },
      { number: 4, title: 'The Lost Map', duration: '47m', description: 'Old coordinates reveal that another ship reached the caves first.' },
      { number: 5, title: 'Deep Current', duration: '50m', description: 'The survivors discover a power source buried below the ice shelf.' },
      { number: 6, title: 'No Safe Return', duration: '46m', description: 'A damaged shuttle forces the crew to choose who gets back to orbit.' },
      { number: 7, title: 'Alien Dawn', duration: '52m', description: 'The distress signal finally answers, but it is not asking for help.' },
      { number: 8, title: 'Home Vector', duration: '55m', description: 'One final launch decides whether the mission becomes rescue or exile.' }
    ],
    isFeatured: true
  },
  {
    title: 'Dhunrandhar 2 : The revenge',
    description: 'A courier with a stolen drive becomes the target of every syndicate in the city.',
    genre: 'Action',
    categories: ['Trending'],
    thumbnail: '/dhurandhar-2-revenge.jpeg',
    banner: '/banners/dhurandhar-2-revenge.jpg',
    videoUrl: demoVideo,
    duration: '1h 48m',
    year: 2025,
    rating: 'PG-13'
  }
]);

console.log('Seeded demo users and movies');
process.exit(0);
