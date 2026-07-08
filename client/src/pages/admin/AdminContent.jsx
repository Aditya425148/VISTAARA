import { Film, Image, Save, Star, Trash2, UploadCloud, Video } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../services/api';
import { getCatalogMovies, getLocalAdminMovies, saveLocalAdminMovies } from '../../data/demoMovies';

const blank = {
  title: '',
  type: 'movie',
  genre: 'Action',
  categories: 'Recently Added',
  year: '2026',
  rating: 'PG-13',
  duration: '',
  durationSeconds: '',
  thumbnail: '',
  banner: '',
  videoUrl: '',
  description: '',
  cast: '',
  isFeatured: false,
  episodeCount: '',
  episodes: ''
};

const genres = ['Action', 'Comedy', 'Crime', 'Drama', 'Sci-Fi', 'Thriller'];
const ratings = ['G', 'PG', 'PG-13', 'R', 'TV-14', 'TV-MA'];
const parseList = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);
const parseEpisodes = (value) => value
  .split('\n')
  .map((line, index) => {
    const [title = '', duration = '', description = '', videoUrl = ''] = line.split('|').map((part) => part.trim());
    if (!title) return null;
    return { number: index + 1, title, duration, description, videoUrl };
  })
  .filter(Boolean);

export default function AdminContent() {
  const [form, setForm] = useState(blank);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState({ thumbnail: null, banner: null, video: null });
  const localIds = useMemo(() => new Set(getLocalAdminMovies().map((movie) => movie._id)), [items]);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const { data } = await api.get('/movies');
        if (active) setItems(data);
      } catch {
        if (active) setItems(getCatalogMovies());
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const upload = async (kind, file) => {
    if (!file) return '';
    const body = new FormData();
    body.append('file', file);
    const endpoint = kind === 'video' ? '/admin/upload/video' : '/admin/upload/image';
    const { data } = await api.post(endpoint, body, { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 30000 });
    return data.url;
  };

  const payloadFromForm = async () => {
    const [thumbnailUrl, bannerUrl, videoUploadedUrl] = await Promise.all([
      upload('image', files.thumbnail),
      upload('image', files.banner),
      upload('video', files.video)
    ]);
    const episodes = parseEpisodes(form.episodes);

    return {
      title: form.title.trim(),
      type: form.type,
      genre: form.genre,
      categories: parseList(form.categories),
      year: Number(form.year),
      rating: form.rating,
      duration: form.duration.trim(),
      durationSeconds: Number(form.durationSeconds) || 0,
      thumbnail: thumbnailUrl || form.thumbnail.trim(),
      banner: bannerUrl || form.banner.trim(),
      videoUrl: videoUploadedUrl || form.videoUrl.trim(),
      description: form.description.trim(),
      cast: parseList(form.cast),
      isFeatured: form.isFeatured,
      episodeCount: form.type === 'series' ? Number(form.episodeCount) || episodes.length : 0,
      episodes: form.type === 'series' ? episodes : []
    };
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = await payloadFromForm();
      const { data } = await api.post('/admin/movies', payload);
      setItems((current) => [data, ...current]);
      setMessage('Movie saved to the database and is now available to users.');
    } catch {
      const payload = await payloadFromForm();
      const localMovie = { ...payload, _id: `local-${crypto.randomUUID()}`, createdAt: new Date().toISOString() };
      const next = [localMovie, ...getLocalAdminMovies()];
      saveLocalAdminMovies(next);
      setItems((current) => [localMovie, ...current]);
      setMessage('Backend unavailable, so this was saved in local demo storage.');
    } finally {
      setForm(blank);
      setFiles({ thumbnail: null, banner: null, video: null });
      setSaving(false);
    }
  };

  const remove = async (movie) => {
    if (localIds.has(movie._id)) {
      const next = getLocalAdminMovies().filter((item) => item._id !== movie._id);
      saveLocalAdminMovies(next);
      setItems((current) => current.filter((item) => item._id !== movie._id));
      return;
    }

    await api.delete(`/admin/movies/${movie._id}`);
    setItems((current) => current.filter((item) => item._id !== movie._id));
  };

  return (
    <section>
      <h1 className="text-3xl font-extrabold">Manage Content</h1>
      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-md border border-white/10 bg-white/7 p-5 lg:grid-cols-2">
        {['title', 'duration', 'thumbnail', 'banner', 'videoUrl'].map((field) => (
          <input key={field} required placeholder={field} value={form[field]} onChange={(e) => set(field, e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
        ))}
        <div className="grid grid-cols-3 gap-3">
          <select value={form.genre} onChange={(e) => set('genre', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none"><option>Action</option><option>Comedy</option><option>Sci-Fi</option></select>
          <input value={form.year} onChange={(e) => set('year', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none" />
          <input value={form.rating} onChange={(e) => set('rating', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none" />
        </div>
        <textarea required placeholder="Description" value={form.description} onChange={(e) => set('description', e.target.value)} className="min-h-28 rounded-sm bg-white/10 p-4 outline-none focus:ring-2 focus:ring-electric lg:col-span-2" />
        <div className="flex flex-wrap gap-3 lg:col-span-2">
          <button className="inline-flex h-12 items-center gap-2 rounded-sm bg-ember px-5 font-bold"><Save size={18} /> Save Content</button>
          <button type="button" className="inline-flex h-12 items-center gap-2 rounded-sm bg-white/10 px-5 font-bold"><UploadCloud size={18} /> Cloudinary Upload</button>
        </div>
      </form>
      <div className="mt-8 overflow-hidden rounded-md border border-white/10">
        {items.map((item) => (
          <div key={item._id} className="grid grid-cols-[80px_1fr_auto] items-center gap-4 border-b border-white/10 p-3 last:border-b-0">
            <img src={item.thumbnail} className="h-14 w-20 rounded object-cover" />
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-white/55">{item.genre} · {item.year} · {item.rating}</p>
            </div>
            <button onClick={() => setItems(items.filter((movie) => movie._id !== item._id))} className="grid h-10 w-10 place-items-center rounded-sm bg-white/10"><Trash2 size={17} /></button>
          </div>
        ))}
      </div>
    </section>
  );
}
