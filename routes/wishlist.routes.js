import express from "express";
import { authenticate } from "../middelware/jwt_middleware.js";
import { wishlistController } from "../controllers/wishlistController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: API endpoints for managing user wishlists
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's wishlist
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
 *                       productId:
 *                         type: string
 *                         description: ID of the product in the wishlist
 *                       name:
 *                         type: string
 *                         description: Name of the product
 *                       price:
 *                         type: number
 *                         description: Price of the product
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [Wishlist]
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
 *                 description: ID of the product to add
 *                 example: 64b2d8f5e4e11f8a1b234567
 *     responses:
 *       201:
 *         description: Product added to the wishlist
 *       400:
 *         description: Invalid product ID or already in wishlist
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wishlist/remove:
 *   post:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlist]
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
 *                 description: ID of the product to remove
 *                 example: 64b2d8f5e4e11f8a1b234567
 *     responses:
 *       200:
 *         description: Product removed from the wishlist
 *       404:
 *         description: Product not found in the wishlist
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wishlist/clear:
 *   post:
 *     summary: Clear the entire wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist cleared
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wishlist/share:
 *   post:
 *     summary: Share the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address to share the wishlist with
 *                 example: friend@example.com
 *     responses:
 *       200:
 *         description: Wishlist shared successfully
 *       400:
 *         description: Invalid email address
 *       401:
 *         description: Unauthorized
 */

router.get("/", authenticate, wishlistController.getWishlist); 
router.post("/add", authenticate, wishlistController.addToWishlist); 
router.post("/remove", authenticate, wishlistController.removeFromWishlist); 
router.post("/clear", authenticate, wishlistController.clearWishlist); 
router.post("/share", authenticate, wishlistController.shareWishlist);


export default router;
