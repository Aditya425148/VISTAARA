import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const limits = { fileSize: 250 * 1024 * 1024 };

export const uploadImage = multer({ storage, limits });
export const uploadVideo = multer({ storage, limits });
export default cloudinary;
