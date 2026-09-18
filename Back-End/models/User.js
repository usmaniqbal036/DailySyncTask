import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);