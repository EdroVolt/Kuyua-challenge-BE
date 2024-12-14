import mongoose from 'mongoose';

const mongoURI =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/locationsDB';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('⚡ MongoDB connected successfully ⚡');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
