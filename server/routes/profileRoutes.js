import express from 'express';
import { addProfile, deleteProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addProfile);
router.patch('/:id', protect, updateProfile);
router.delete('/:id', protect, deleteProfile);

export default router;
