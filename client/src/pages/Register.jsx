import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlice';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(register(form)).unwrap();
    navigate('/');
  };

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-md border border-white/10 p-8 shadow-glow">
        <h1 className="text-3xl font-extrabold">Create account</h1>
        <input required className="mt-8 h-12 w-full rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required className="mt-4 h-12 w-full rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required minLength={6} className="mt-4 h-12 w-full rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="mt-6 h-12 w-full rounded-sm bg-ember font-bold transition hover:brightness-110">Start watching</button>
        <p className="mt-5 text-center text-sm text-white/60">Already registered? <Link className="font-bold text-white" to="/login">Login</Link></p>
      </form>
    </main>
  );
}
