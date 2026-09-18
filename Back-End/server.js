import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { connectDB } from './config/db.js';
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Database connect PEHLE — routes se pehle hona zaroori hai
let isConnected = false;
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});
// Ab routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => res.send("TaskFlow API is running"));

if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port, () => {
    console.log(`${config.appName} is running on port ${config.port}`);
  });
}

export default app;