import express from 'express';
import dns from 'dns';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { connectDB } from './config/db.js';
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = express();

const startServer = async () => {
  await connectDB();

  app.use(cors({ origin: process.env.CLIENT_URL }));
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/tasks", taskRoutes);

  app.get("/", (req, res) => res.send("TaskFlow API is running"));

  app.listen(config.port, () => {
    console.log(`${config.appName} is running on port ${config.port}`);
  });
};

startServer();