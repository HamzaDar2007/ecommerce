import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    change: {
      type: Number, 
      required: true,
    },
    reason: {
      type: String,   
      required: true,
    },
    type: {
      type: String,
      enum: ["add", "deduct"], // New field to indicate change type
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
