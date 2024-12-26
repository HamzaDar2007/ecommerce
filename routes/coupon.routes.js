import express from "express";
import { couponController } from "../controllers/coupon.controller.js";
import { authenticate, authenticateAdmin } from "../middelware/jwt_middleware.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: API endpoints for managing and applying coupons
 */

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The coupon code
 *                 example: SAVE20
 *               discount:
 *                 type: number
 *                 description: Discount percentage or amount
 *                 example: 20
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 description: The expiration date of the coupon
 *                 example: 2024-12-31
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *       400:
 *         description: Invalid input or coupon code already exists
 *       401:
 *         description: Unauthorized (Admin only)
 */

/**
 * @swagger
 * /coupons/apply:
 *   post:
 *     summary: Apply a coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The coupon code to apply
 *                 example: SAVE20
 *               totalAmount:
 *                 type: number
 *                 description: The total amount before applying the coupon
 *                 example: 100
 *     responses:
 *       200:
 *         description: Coupon applied successfully with the discounted total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 discountedTotal:
 *                   type: number
 *                   description: The total amount after applying the coupon
 *                   example: 80
 *       400:
 *         description: Invalid coupon or coupon expired
 *       401:
 *         description: Unauthorized
 */


router.post("/", authenticateAdmin, couponController.createCoupon); // Admin creates a coupon
router.post("/apply", authenticate, couponController.applyCoupon); // User applies a coupon

export default router;
