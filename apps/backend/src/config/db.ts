import mongoose from "mongoose"

export const connectDB = async (MONGO_URI: string) => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
      socketTimeoutMS: 45000, // Socket timeout
      connectTimeoutMS: 10000, // Connection timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
      heartbeatFrequencyMS: 10000, // Heartbeat frequency
    })
    console.log("✅ MongoDB connected")
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
    // Don't exit immediately, allow for retry logic
    throw error
  }
}
