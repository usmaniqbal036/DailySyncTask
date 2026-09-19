import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { connectDB } from './config/db.js';
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

// ✅ CORS setup — frontend URL allow + credentials
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://daily-task-syncs.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

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