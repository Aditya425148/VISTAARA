import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI missing. API started without database connection.');
    return;
  }

  if (mongoose.connection.readyState === 1) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
