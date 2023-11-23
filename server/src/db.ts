import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI || 'fallback_default_mongodb_uri';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
