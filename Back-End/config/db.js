import mongoose from "mongoose";

let connectionPromise = null;

export function connectDB() {
  if (!connectionPromise) {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    connectionPromise = mongoose.connect(uri).then(() => {
      console.log("MongoDB connected");
    }).catch((error) => {
      console.log("Connection failed.", error.message);
      connectionPromise = null; // taake agli request dobara try kar sake
      throw error;
    });
  }

  return connectionPromise;
}