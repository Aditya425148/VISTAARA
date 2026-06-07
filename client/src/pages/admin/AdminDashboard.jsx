import { Film, FolderKanban, Users, Video } from 'lucide-react';

const cards = [
  { label: 'Movies', value: '128', icon: Film },
  { label: 'Series', value: '42', icon: Video },
  { label: 'Users', value: '18.4k', icon: Users },
  { label: 'Categories', value: '12', icon: FolderKanban }
];

export default function AdminDashboard() {
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
    </section>
  );
}
