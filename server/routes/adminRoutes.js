import express from 'express';
import {
  analytics,
  createCategory,
  createMovie,
  deleteMovie,
  listCategories,
  updateMovie,
  uploadMedia
} from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { uploadImage, uploadVideo } from '../config/cloudinary.js';

const router = express.Router();

router.use(protect, adminOnly);
router.get('/analytics', analytics);
router.post('/movies', createMovie);
router.patch('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);
router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.post('/upload/image', (req, _res, next) => { req.resourceType = 'image'; next(); }, uploadImage.single('file'), uploadMedia);
router.post('/upload/video', (req, _res, next) => { req.resourceType = 'video'; next(); }, uploadVideo.single('file'), uploadMedia);

export default router;
