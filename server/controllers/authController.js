import User from '../models/User.js';
import { generateToken } from '../utils/token.js';
import crypto from 'crypto';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '989083056561-5pqnb5itt2trg2a52jpctfluaqa23h3s.apps.googleusercontent.com';

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

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(409).json({ message: 'This email is already registered. Please log in instead.' });

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      profiles: [{ name, avatar: `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(name)}` }]
    });

    res.status(201).json(authPayload(user));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This email is already registered. Please log in instead.' });
    }
    next(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json(authPayload(user));
};

export const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ message: 'Google credential is required' });

    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
    const profile = await response.json();

    if (!response.ok || profile.aud !== GOOGLE_CLIENT_ID || profile.email_verified !== 'true') {
      return res.status(401).json({ message: 'Google sign-in could not be verified' });
    }

    const normalizedEmail = profile.email.trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const name = profile.name || normalizedEmail.split('@')[0];
      user = await User.create({
        name,
        email: normalizedEmail,
        password: crypto.randomBytes(24).toString('hex'),
        profiles: [{ name, avatar: profile.picture || `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(name)}` }]
      });
    }

    res.json(authPayload(user));
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
