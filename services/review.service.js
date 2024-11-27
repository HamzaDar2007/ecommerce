import { Review } from "../models/ecommerce/review.models.js";
import { Product } from "../models/ecommerce/product.models.js";

export const reviewService = {
  addReview: async (userId, productId, rating, comment) => {
    // Check if the user already reviewed this product
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      throw new Error("You have already reviewed this product.");
    }

    // Create a new review
    const review = await Review.create({
      product: productId,
      user: userId,
      rating,
      comment,
    });

    // Update the product's average rating and review count
    const reviews = await Review.find({ product: productId });
    const numReviews = reviews.length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews;

    await Product.findByIdAndUpdate(productId, { averageRating, numReviews });

    return review;
  },

  getProductReviews: async (productId) => {
    return await Review.find({ product: productId }).populate("user", "username email");
  },

  deleteReview: async (reviewId) => {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error("Review not found.");
    }

    // Delete the review
    await review.remove();

    // Recalculate product's average rating and review count
    const reviews = await Review.find({ product: review.product });
    const numReviews = reviews.length;
    const averageRating = numReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews : 0;

    await Product.findByIdAndUpdate(review.product, { averageRating, numReviews });
  },
};
