import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, login } from '../redux/slices/authSlice';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '989083056561-5pqnb5itt2trg2a52jpctfluaqa23h3s.apps.googleusercontent.com';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const googleButtonRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true);
  const [form, setForm] = useState({ email: 'viewer@vistaara.dev', password: 'password' });
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const renderGoogleButton = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          setError('');
          try {
            const data = await dispatch(googleLogin(response.credential)).unwrap();
            navigate(data.user.role === 'admin' ? '/admin' : '/');
          } catch (googleError) {
            setError(googleError.message);
          }
        }
      });

      googleButtonRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'filled_black',
        size: 'large',
        shape: 'rectangular',
        width: googleButtonRef.current.offsetWidth || 380,
        text: 'continue_with'
      });
    };

    if (window.google) {
      renderGoogleButton();
      return undefined;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = renderGoogleButton;
    document.head.appendChild(script);
    return () => {
      script.onload = null;
    };
  }, [dispatch, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await dispatch(login(form)).unwrap();
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      {showIntro && (
        <div className="vistaara-intro fixed inset-0 z-50 grid place-items-center bg-ink">
          <div className="vistaara-aura" />
          <h1 className="vistaara-intro-title">VISTAARA</h1>
        </div>
      )}

      <section className={`grid min-h-screen transition duration-700 ${showIntro ? 'opacity-0' : 'opacity-100'} lg:grid-cols-[1.08fr_.92fr]`}>
        <div className="relative hidden overflow-hidden border-r border-white/10 px-12 py-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(255,77,61,.28),transparent_24rem),radial-gradient(circle_at_72%_72%,rgba(111,140,255,.26),transparent_26rem)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[.45em] text-white/52">free streaming</p>
            <h2 className="mt-6 text-7xl font-black uppercase leading-none tracking-normal xl:text-8xl">Vistaara</h2>
          </div>
          <div className="relative z-10 max-w-xl">
            <p className="text-2xl font-bold leading-tight">Discover films, series, watch history, favorites, and personalized recommendations in one cinematic space.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-sm text-white/70">
              <span className="rounded-sm border border-white/10 bg-white/8 px-4 py-3">Trending</span>
              <span className="rounded-sm border border-white/10 bg-white/8 px-4 py-3">My List</span>
              <span className="rounded-sm border border-white/10 bg-white/8 px-4 py-3">Continue</span>
            </div>
          </div>
        </div>

        <div className="grid min-h-screen place-items-center px-4 py-10 sm:px-8">
          <form onSubmit={submit} className="glass w-full max-w-md rounded-md border border-white/10 p-8 shadow-glow">
            <div className="lg:hidden">
              <p className="text-sm font-semibold uppercase tracking-[.38em] text-white/45">Vistaara</p>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold">Welcome back</h1>
            <p className="mt-2 text-sm text-white/60">Stream freely with your Vistaara account.</p>
            <input className="mt-8 h-12 w-full rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="mt-4 h-12 w-full rounded-sm bg-white/10 px-4 outline-none focus:ring-2 focus:ring-electric" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[.24em] text-white/35">
              <span className="h-px flex-1 bg-white/10" />
              or
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="mt-5 min-h-11 w-full overflow-hidden rounded-sm" ref={googleButtonRef} />
            {error && <p className="mt-4 text-sm font-medium text-rose-300">{error}</p>}
            <button className="mt-6 h-12 w-full rounded-sm bg-ember font-bold transition hover:brightness-110" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
            <p className="mt-5 text-center text-sm text-white/60">New here? <Link className="font-bold text-white" to="/register">Create account</Link></p>
          </form>
        </div>
      </section>
    </main>
  );
}
