import { Film, FolderKanban, Users, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ movies: 0, series: 0, users: 0, categories: 0, recentUploads: [] });

  useEffect(() => {
    api.get('/admin/analytics')
      .then(({ data }) => setStats((current) => ({ ...current, ...data })))
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'Movies', value: stats.movies, icon: Film },
    { label: 'Series', value: stats.series || 0, icon: Video },
    { label: 'Users', value: stats.users, icon: Users },
    { label: 'Categories', value: stats.categories, icon: FolderKanban }
  ];

  return (
    <section>
      <h1 className="text-3xl font-extrabold">Dashboard Analytics</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-md border border-white/10 bg-white/7 p-6">
              <Icon className="text-electric" />
              <p className="mt-5 text-3xl font-extrabold">{card.value}</p>
              <p className="text-sm text-white/60">{card.label}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-8 rounded-md border border-white/10 bg-white/7 p-6">
        <h2 className="text-xl font-bold">Upload Pipeline</h2>
        <p className="mt-3 max-w-2xl text-white/62">Use the Content panel to add movies, series, thumbnails, banners, Cloudinary video URLs, genres, years, duration, and ratings.</p>
      </div>
      {stats.recentUploads?.length > 0 && (
        <div className="mt-8 rounded-md border border-white/10 bg-white/7 p-6">
          <h2 className="text-xl font-bold">Recent Uploads</h2>
          <div className="mt-4 grid gap-3">
            {stats.recentUploads.map((movie) => (
              <div key={movie._id} className="flex items-center justify-between gap-4 rounded-sm bg-white/7 px-4 py-3">
                <span className="font-semibold">{movie.title}</span>
                <span className="text-sm text-white/55">{movie.genre}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
