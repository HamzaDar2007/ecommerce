/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management API
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: [] # Indicates this endpoint requires authentication
 *     responses:
 *       200:
 *         description: User's cart data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                         description: Product ID
 *                       quantity:
 *                         type: integer
 *                         description: Product quantity
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: [] # Indicates this endpoint requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add
 *               quantity:
 *                 type: integer
 *                 description: Quantity to add
 *     responses:
 *       200:
 *         description: Product added to cart
 *       400:
 *         description: Product not found or invalid request
 */

/**
 * @swagger
 * /cart/remove:
 *   post:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: [] # Indicates this endpoint requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * /cart/clear:
 *   post:
 *     summary: Clear the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: [] # Indicates this endpoint requires authentication
 *     responses:
 *       200:
 *         description: Cart cleared
 *       400:
 *         description: Invalid request
 */

import express from "express";
import { cartController } from "../controllers/cartController.js";
import { authenticate } from "../middelware/jwt_middleware.js";

const router = express.Router();

// Routes with authentication
router.get("/", authenticate, cartController.getCart);
router.post("/add", authenticate, cartController.addToCart);
router.post("/remove", authenticate, cartController.removeFromCart);
router.post("/clear", authenticate, cartController.clearCart);

export default router;
