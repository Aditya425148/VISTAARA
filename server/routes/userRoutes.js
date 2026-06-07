import express from 'express';
import { getFavorites, getHistory, saveProgress, toggleFavorite } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/favorites', protect, getFavorites);
router.post('/favorites/toggle', protect, toggleFavorite);
router.get('/history', protect, getHistory);
router.post('/progress', protect, saveProgress);

export default router;
