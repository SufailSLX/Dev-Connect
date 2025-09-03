import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())

// Test route
app.get("/", (_, res) => {
  res.json({ message: "🚀 Dev Connect Backend Running" })
})

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/devconnect"

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected")
    app.listen(PORT, () => {
      console.log(`🌍 Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err)
  })
