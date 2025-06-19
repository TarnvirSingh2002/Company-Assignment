import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/intershalla");
    console.log('✅ DB connected successfully');
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1); // Exit app if DB fails to connect
  }
};
