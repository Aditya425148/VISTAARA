import { Save, Trash2, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { demoMovies } from '../../data/demoMovies';

const blank = { title: '', genre: 'Action', year: '2026', rating: 'PG-13', duration: '', thumbnail: '', banner: '', videoUrl: '', description: '' };

export default function AdminContent() {
  const [form, setForm] = useState(blank);
  const [items, setItems] = useState(demoMovies);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    setItems([{ ...form, _id: crypto.randomUUID(), categories: ['Recently Added'] }, ...items]);
    setForm(blank);
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
