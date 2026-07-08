import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/slices/userSlice";

export default function Hero({ movie, movies = [] }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);
  const slides = useMemo(() => {
    const list = movies?.length ? movies : movie ? [movie] : [];
    return list.filter(Boolean);
  }, [movie, movies]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    setActiveIndex((index) => Math.min(index, slides.length - 1));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return <div className="h-[68vh] skeleton" />;

  const activeMovie = slides[activeIndex];
  const saved = favorites.some((item) => item._id === activeMovie._id);
  const titleClass = activeMovie.title.length > 22
    ? "mt-5 h-[6.8rem] max-w-xl overflow-hidden text-4xl font-black uppercase leading-[.92] tracking-normal text-white/70 sm:h-[9.2rem] sm:text-6xl"
    : "mt-5 h-[6.8rem] max-w-xl overflow-hidden text-5xl font-black uppercase leading-[.88] tracking-normal text-white/70 sm:h-[9.2rem] sm:text-7xl";
  const goTo = (offset) => setActiveIndex((index) => (index + offset + slides.length) % slides.length);
  const previewSlides = [0, 1, 2].map((offset) => slides[(activeIndex + offset) % slides.length]);

  return (
    <section className="relative min-h-[650px] overflow-hidden bg-[#07080d]">
      <img key={activeMovie._id} src={activeMovie.banner || activeMovie.thumbnail} alt="" className="hero-slide-image absolute inset-0 h-full w-full object-cover object-[68%_35%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080d] via-[#07080d]/86 to-[#07080d]/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/44 via-transparent to-ink" />
      <div key={activeMovie._id + "-copy"} className="hero-slide-copy relative z-10 flex min-h-[650px] max-w-2xl flex-col justify-start px-7 pb-32 pt-28 sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[.28em] text-white/52">Vistaara Original</p>
        <h1 className={titleClass}>{activeMovie.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-bold text-white/68">
          <span>{activeMovie.year}</span>
          <span>{activeMovie.duration}</span>
          <span>English</span>
          <span className="rounded-sm bg-white/12 px-2 py-1">{activeMovie.rating}</span>
        </div>
        <p className="mt-5 min-h-[4.5rem] max-w-lg text-sm leading-6 text-white/68 sm:text-base">{activeMovie.description}</p>
        <p className="mt-6 text-sm font-semibold text-white/68">{activeMovie.genre} | Trending</p>
        <div className="mt-8 flex gap-3">
          <Link to={`/watch/${activeMovie._id}`} className="inline-flex h-12 w-64 items-center justify-center gap-3 rounded-md bg-white/12 px-6 text-sm font-bold text-white backdrop-blur transition hover:scale-[1.03] hover:bg-white/18"><Play size={18} fill="currentColor" /> Watch Now</Link>
          <button onClick={() => dispatch(toggleFavorite(activeMovie))} className="grid h-12 w-12 place-items-center rounded-md bg-white/12 transition hover:scale-110 hover:bg-white/18" aria-label={saved ? "Remove from list" : "Add to list"}><Plus size={20} /></button>
        </div>
      </div>
      <div className="absolute bottom-56 right-6 z-10 hidden gap-3 xl:flex">
        {previewSlides.map((item, index) => (
          <button key={item._id + index} onClick={() => setActiveIndex((activeIndex + index) % slides.length)} className={`h-12 overflow-hidden rounded-sm border transition hover:scale-105 ${index === 0 ? "w-20 border-white" : "w-16 border-white/20"}`} aria-label={`Show ${item.title}`}>
            <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-24 right-6 z-20 flex gap-2">
          <button onClick={() => goTo(-1)} className="grid h-9 w-9 place-items-center rounded-sm border border-white/15 bg-[#171426]/85 text-white shadow-lg backdrop-blur transition hover:border-white/30 hover:bg-[#241f36]/90" aria-label="Previous slide"><ChevronLeft size={20} /></button>
          <button onClick={() => goTo(1)} className="grid h-9 w-9 place-items-center rounded-sm border border-white/15 bg-[#171426]/85 text-white shadow-lg backdrop-blur transition hover:border-white/30 hover:bg-[#241f36]/90" aria-label="Next slide"><ChevronRight size={20} /></button>
        </div>
      )}
    </section>
  );
}
