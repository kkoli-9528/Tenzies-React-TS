import mongoose from "mongoose"; 'mongoose';

export const connectDB = async () : Promise<void> => {
  try {
    const mongoURL = process.env.MONGO_URL
    if(!mongoURL) throw new Error("MONGO_URL is not defined in .env file")
    await mongoose.connect(mongoURL)
    console.log('MongoDB conneted')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}