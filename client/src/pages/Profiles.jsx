import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfile, switchProfile } from "../redux/slices/authSlice";

export default function Profiles() {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.auth);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");

  const submitProfile = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    dispatch(addProfile(name));
    setName("");
    setIsAdding(false);
  };

  return (
    <section className="px-4 pt-20 sm:px-8 sm:pt-24">
      <h1 className="text-3xl font-extrabold">Who is watching?</h1>
      <div className="mt-12 flex flex-wrap gap-6">
        {user.profiles?.map((item) => (
          <button key={item._id} onClick={() => dispatch(switchProfile(item))} className={"w-44 rounded-md border p-5 transition hover:bg-white/10 " + (profile?._id === item._id ? "border-electric" : "border-white/10")}>
            <img src={item.avatar} className="mx-auto h-32 w-32 rounded-md bg-white/10 object-cover" />
            <span className="mt-4 block text-lg font-semibold">{item.name}</span>
          </button>
        ))}
        {isAdding ? (
          <form onSubmit={submitProfile} className="w-44 rounded-md border border-white/10 p-5">
            <div className="grid h-32 w-32 place-items-center rounded-md bg-white/10 text-white/70">
              <Plus size={34} />
            </div>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoFocus
              maxLength={18}
              placeholder="Profile name"
              className="mt-4 h-10 w-full rounded-sm border border-white/10 bg-white/8 px-3 text-center text-sm font-semibold outline-none focus:border-electric"
            />
            <div className="mt-3 flex gap-2">
              <button type="submit" className="h-9 flex-1 rounded-sm bg-electric text-sm font-bold text-ink">Add</button>
              <button type="button" onClick={() => { setIsAdding(false); setName(""); }} className="h-9 flex-1 rounded-sm bg-white/10 text-sm font-bold">Cancel</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setIsAdding(true)} className="w-44 rounded-md border border-dashed border-white/18 p-5 text-white/62 transition hover:border-electric hover:bg-white/10 hover:text-white">
            <div className="grid h-32 w-32 place-items-center rounded-md bg-white/10">
              <Plus size={38} />
            </div>
            <span className="mt-4 block text-lg font-semibold">Add Profile</span>
          </button>
        )}
      </div>
    </section>
  );
}
