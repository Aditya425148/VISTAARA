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

export default function AdminContentPortal() {
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

  const payloadFromForm = async ({ skipUploads = false } = {}) => {
    const [thumbnailUrl, bannerUrl, videoUploadedUrl] = skipUploads ? ['', '', ''] : await Promise.all([
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
      const payload = await payloadFromForm({ skipUploads: true });
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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.28em] text-white/42">Admin Portal</p>
          <h1 className="mt-3 text-3xl font-extrabold">Manage Content</h1>
        </div>
        <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/7 px-4 py-3 text-sm text-white/62">
          <Film size={18} /> {items.length} titles
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-md border border-white/10 bg-white/7 p-5 lg:grid-cols-2">
        <input required placeholder="Title" value={form.title} onChange={(e) => set('title', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <select value={form.type} onChange={(e) => set('type', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none">
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
          <select value={form.genre} onChange={(e) => set('genre', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none">
            {genres.map((genre) => <option key={genre}>{genre}</option>)}
          </select>
          <input required type="number" min="1900" max="2100" value={form.year} onChange={(e) => set('year', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none" />
          <select value={form.rating} onChange={(e) => set('rating', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none">
            {ratings.map((rating) => <option key={rating}>{rating}</option>)}
          </select>
        </div>

        <input required placeholder="Duration, for example 2h 12m" value={form.duration} onChange={(e) => set('duration', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
        <input placeholder="Duration in seconds" type="number" min="0" value={form.durationSeconds} onChange={(e) => set('durationSeconds', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
        <input required placeholder="Thumbnail image URL" value={form.thumbnail} onChange={(e) => set('thumbnail', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
        <label className="inline-flex h-12 cursor-pointer items-center gap-3 rounded-sm bg-white/10 px-4 text-sm font-semibold text-white/72">
          <Image size={18} /> Upload thumbnail
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setFiles((current) => ({ ...current, thumbnail: e.target.files?.[0] || null }))} />
        </label>
        <input required placeholder="Banner image URL" value={form.banner} onChange={(e) => set('banner', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
        <label className="inline-flex h-12 cursor-pointer items-center gap-3 rounded-sm bg-white/10 px-4 text-sm font-semibold text-white/72">
          <UploadCloud size={18} /> Upload banner
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setFiles((current) => ({ ...current, banner: e.target.files?.[0] || null }))} />
        </label>
        <input required placeholder="Video URL" value={form.videoUrl} onChange={(e) => set('videoUrl', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
        <label className="inline-flex h-12 cursor-pointer items-center gap-3 rounded-sm bg-white/10 px-4 text-sm font-semibold text-white/72">
          <Video size={18} /> Upload video
          <input type="file" accept="video/*" className="hidden" onChange={(e) => setFiles((current) => ({ ...current, video: e.target.files?.[0] || null }))} />
        </label>
        <input placeholder="Categories, comma separated" value={form.categories} onChange={(e) => set('categories', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
        <input placeholder="Cast, comma separated" value={form.cast} onChange={(e) => set('cast', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />

        {form.type === 'series' && (
          <>
            <input placeholder="Episode count" type="number" min="0" value={form.episodeCount} onChange={(e) => set('episodeCount', e.target.value)} className="h-12 rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" />
            <textarea placeholder="Episodes, one per line: Title | Duration | Description | Video URL" value={form.episodes} onChange={(e) => set('episodes', e.target.value)} className="min-h-28 rounded-sm bg-white/10 p-4 outline-none focus:ring-2 focus:ring-electric" />
          </>
        )}

        <textarea required placeholder="Description" value={form.description} onChange={(e) => set('description', e.target.value)} className="min-h-28 rounded-sm bg-white/10 p-4 outline-none focus:ring-2 focus:ring-electric lg:col-span-2" />
        <label className="inline-flex h-12 items-center gap-3 rounded-sm bg-white/10 px-4 text-sm font-semibold text-white/72">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} className="h-4 w-4 accent-[#ff4d3d]" />
          <Star size={18} /> Feature on home
        </label>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-ember px-5 font-bold transition hover:brightness-110 disabled:opacity-60" disabled={saving}>
          <Save size={18} /> {saving ? 'Saving...' : 'Save Content'}
        </button>
      </form>

      {message && <p className="mt-4 rounded-sm border border-white/10 bg-white/7 px-4 py-3 text-sm text-white/70">{message}</p>}

      <div className="mt-8 overflow-hidden rounded-md border border-white/10">
        {loading && <p className="p-5 text-white/62">Loading content...</p>}
        {!loading && items.map((item) => (
          <div key={item._id} className="grid grid-cols-[80px_1fr_auto] items-center gap-4 border-b border-white/10 p-3 last:border-b-0">
            <img src={item.thumbnail} alt="" className="h-14 w-20 rounded object-cover" />
            <div className="min-w-0">
              <p className="truncate font-bold">{item.title}</p>
              <p className="text-sm text-white/55">{item.type || 'movie'} | {item.genre} | {item.year} | {item.rating}</p>
            </div>
            <button onClick={() => remove(item)} className="grid h-10 w-10 place-items-center rounded-sm bg-white/10 transition hover:bg-ember" aria-label={`Delete ${item.title}`}>
              <Trash2 size={17} />
            </button>
          </div>
        ))}
        {!loading && !items.length && <p className="p-5 text-white/62">No content yet.</p>}
      </div>
    </section>
  );
}
