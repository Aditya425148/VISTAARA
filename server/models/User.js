import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    avatar: { type: String, default: '' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    watchHistory: [
      {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
        progress: { type: Number, default: 0 },
        duration: { type: Number, default: 0 },
        watchedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profiles: [profileSchema],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    watchHistory: [
      {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
        progress: { type: Number, default: 0 },
        duration: { type: Number, default: 0 },
        watchedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = function matchPassword(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
