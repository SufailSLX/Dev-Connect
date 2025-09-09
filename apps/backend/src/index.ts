import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/devconnect"

app.use(express.json())

app.use("/api/auth", authRoutes)

const startServer = async () => {
  let retries = 3
  
  while (retries > 0) {
    try {
      await connectDB(MONGO_URI)
      break
    } catch (error) {
      retries--
      console.log(`❌ MongoDB connection failed. Retries left: ${retries}`)
      
      if (retries === 0) {
        console.error("❌ Failed to connect to MongoDB after multiple attempts")
        process.exit(1)
      }
      
      // Wait 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }
  
  app.listen(PORT, () => {
    console.log(`🌍 Server running at http://localhost:${PORT}`)
  })
}

startServer()
