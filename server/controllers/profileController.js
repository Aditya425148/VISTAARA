import User from '../models/User.js';

export const addProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.profiles.push({
    name: req.body.name,
    avatar: req.body.avatar || `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(req.body.name)}`
  });
  await user.save();
  res.status(201).json(user.profiles);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = user.profiles.id(req.params.id);
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  profile.name = req.body.name ?? profile.name;
  profile.avatar = req.body.avatar ?? profile.avatar;
  await user.save();
  res.json(user.profiles);
};

export const deleteProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.profiles.pull(req.params.id);
  await user.save();
  res.json(user.profiles);
};
