import { Maximize, Pause, Play, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProgress } from '../redux/slices/userSlice';

export default function VideoPlayer({ movie }) {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.user.progress[movie._id]);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(movie.durationSeconds || 0);

  useEffect(() => {
    const video = videoRef.current;
    if (video && progress?.progress) video.currentTime = progress.progress;
  }, [progress]);

  useEffect(() => {
    const id = setInterval(() => {
      const video = videoRef.current;
      if (video && video.currentTime > 3) {
        dispatch(saveProgress({ movie, progress: video.currentTime, duration: video.duration || duration }));
      }
    }, 5000);
    return () => clearInterval(id);
  }, [dispatch, duration, movie]);

  const toggle = () => {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
  };

  const percent = duration ? (time / duration) * 100 : 0;

  return (
    <div className="relative h-screen bg-black">
      <video
        ref={videoRef}
        src={movie.videoUrl}
        className="h-full w-full object-contain"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 sm:p-8">
        <h1 className="mb-5 text-2xl font-bold">{movie.title}</h1>
        <input type="range" min="0" max={duration || 0} value={time} onChange={(e) => (videoRef.current.currentTime = Number(e.target.value))} className="w-full accent-ember" style={{ backgroundSize: `${percent}% 100%` }} />
        <div className="mt-4 flex items-center gap-3">
          <button onClick={toggle} className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink">{playing ? <Pause /> : <Play fill="currentColor" />}</button>
          <Volume2 />
          <span className="text-sm text-white/70">{Math.floor(time / 60)}:{String(Math.floor(time % 60)).padStart(2, '0')}</span>
          <button onClick={() => videoRef.current?.requestFullscreen()} className="ml-auto grid h-11 w-11 place-items-center rounded-sm bg-white/10"><Maximize size={18} /></button>
        </div>
      </div>
    </div>
  );
}
