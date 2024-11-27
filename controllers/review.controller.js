import { reviewService } from "../services/review.service.js";
import { Review } from "../models/ecommerce/review.models.js";
import { Product } from "../models/ecommerce/product.models.js";

export const reviewController = {
  addReview: async (req, res) => {
    try {
      const { productId, rating, comment } = req.body;
      const review = await reviewService.addReview(req.user.id, productId, rating, comment);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProductReviews: async (req, res) => {
    try {
      const { productId } = req.params;
      const reviews = await reviewService.getProductReviews(productId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
    
  deleteReview: async (req, res) => {
    try {
        const { reviewId } = req.params; // Extract reviewId from URL parameters

        // Find the review by ID
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        // Delete the review using deleteOne
        await Review.deleteOne({ _id: reviewId });

        // Recalculate the product's average rating and number of reviews
        const reviews = await Review.find({ product: review.product });
        const numReviews = reviews.length;
        const averageRating = numReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews : 0;

        // Update the product with the new rating and review count
        await Product.findByIdAndUpdate(review.product, { averageRating, numReviews });

        res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  },
};

