import Movie from '../models/Movie.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import cloudinary from '../config/cloudinary.js';

export const analytics = async (_req, res) => {
  const [movies, series, users, categoryDocs, movieCategories, movieGenres, recent] = await Promise.all([
    Movie.countDocuments({ type: 'movie' }),
    Movie.countDocuments({ type: 'series' }),
    User.countDocuments(),
    Category.find().select('name -_id').lean(),
    Movie.distinct('categories'),
    Movie.distinct('genre'),
    Movie.find().sort({ createdAt: -1 }).limit(5)
  ]);

  const categories = new Set([
    ...categoryDocs.map((category) => category.name),
    ...movieCategories,
    ...movieGenres
  ].filter(Boolean)).size;

  res.json({ movies, series, users, categories, recentUploads: recent });
};

export const createMovie = async (req, res) => {
  const movie = await Movie.create({ ...req.body, addedBy: req.user._id });
  res.status(201).json(movie);
};

export const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!movie) return res.status(404).json({ message: 'Content not found' });
  res.json(movie);
};

export const deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Content not found' });
  res.json({ message: 'Content deleted' });
};

export const createCategory = async (req, res) => {
  const slug = req.body.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  const category = await Category.create({ ...req.body, slug });
  res.status(201).json(category);
};

export const listCategories = async (_req, res) => {
  res.json(await Category.find().sort({ name: 1 }));
};

export const uploadMedia = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File is required' });
  const resourceType = req.resourceType || 'image';
  const folder = resourceType === 'video' ? 'ott/videos' : 'ott/images';
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, uploadResult) => (error ? reject(error) : resolve(uploadResult))
    );
    stream.end(req.file.buffer);
  });

  res.json({ url: result.secure_url, publicId: result.public_id });
};
