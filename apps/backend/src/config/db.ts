import mongoose from "mongoose"

export const connectDB = async (MONGO_URI: string) => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("✅ MongoDB connected")
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
    process.exit(1)
  }
}
