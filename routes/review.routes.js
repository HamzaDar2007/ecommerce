import express from "express";
import { reviewController } from "../controllers/review.controller.js";
import { authenticate } from "../middelware/jwt_middleware.js";

const router = express.Router();

router.post("/", authenticate, reviewController.addReview); // Add a review
router.get("/:productId", reviewController.getProductReviews); // Get all reviews for a product
router.delete("/:reviewId", authenticate, reviewController.deleteReview); // Delete a review

export default router;
