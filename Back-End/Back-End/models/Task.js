import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 200, default: "" },
    status: {
      type: String,
      enum: ["Pending", "InComplete", "Complete"],
      default: "Pending",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } 
);

export default mongoose.model("Task", taskSchema);
