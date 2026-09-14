import mongoose from "mongoose";

export async function connectDB() {
    try{
        const uri = process.env.MONGO_URI;

    if (!uri) {
  throw new Error("MONGO_URI environment variable is not set");
}

    await mongoose.connect(uri);
    console.log("MongoDB connected");
    }
    catch(error){
        console.log("Connection failed.", error.message);
        process.exit(1);
    }
    
}