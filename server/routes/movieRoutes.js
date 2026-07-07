import express from 'express';
import { getHomeRows, getMovieById, getMovies, getRecommendations, getSimilarMoviesById } from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMovies);
router.get('/home', protect, getHomeRows);
router.get('/recommendations', protect, getRecommendations);
router.get('/:id/similar', protect, getSimilarMoviesById);
router.get('/:id', protect, getMovieById);

export default router;
