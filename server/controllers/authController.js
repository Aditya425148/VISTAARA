import User from '../models/User.js';
import { generateToken } from '../utils/token.js';

const authPayload = (user) => ({
  token: generateToken(user._id),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profiles: user.profiles
  }
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });

  const user = await User.create({
    name,
    email,
    password,
    profiles: [{ name, avatar: `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(name)}` }]
  });

  res.status(201).json(authPayload(user));
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json(authPayload(user));
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
