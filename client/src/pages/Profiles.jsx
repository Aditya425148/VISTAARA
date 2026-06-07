import { useDispatch, useSelector } from 'react-redux';
import { switchProfile } from '../redux/slices/authSlice';

export default function Profiles() {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.auth);
  return (
    <section className="px-4 sm:px-8">
      <h1 className="text-3xl font-extrabold">Who's watching?</h1>
      <div className="mt-10 flex flex-wrap gap-6">
        {user.profiles?.map((item) => (
          <button key={item._id} onClick={() => dispatch(switchProfile(item))} className={`w-32 rounded-md border p-4 transition hover:bg-white/10 ${profile?._id === item._id ? 'border-electric' : 'border-white/10'}`}>
            <img src={item.avatar} className="mx-auto h-20 w-20 rounded-md bg-white/10 object-cover" />
            <span className="mt-3 block font-semibold">{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
