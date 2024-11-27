import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the product being reviewed
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user leaving the review
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Ratings range from 1 to 5
    },
    comment: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
