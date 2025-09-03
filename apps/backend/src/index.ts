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

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🌍 Server running at http://localhost:${PORT}`)
  })
})
