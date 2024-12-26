import express from "express";
import { reviewController } from "../controllers/review.controller.js";
import { authenticate } from "../middelware/jwt_middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for managing product reviews
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review for a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product being reviewed
 *                 example: 64b2d8f5e4e11f8a1b234567
 *               rating:
 *                 type: number
 *                 description: Rating for the product (1-5)
 *                 example: 4
 *               comment:
 *                 type: string
 *                 description: Review comment
 *                 example: "Great product, highly recommend!"
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /reviews/{productId}:
 *   get:
 *     summary: Get all reviews for a specific product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: A list of reviews for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   productId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   rating:
 *                     type: number
 *                     description: Rating for the product
 *                   comment:
 *                     type: string
 *                     description: Review comment
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Product not found or no reviews available
 */

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 */

router.post("/", authenticate, reviewController.addReview); // Add a review
router.get("/:productId", reviewController.getProductReviews); // Get all reviews for a product
router.delete("/:reviewId", authenticate, reviewController.deleteReview); // Delete a review

export default router;
