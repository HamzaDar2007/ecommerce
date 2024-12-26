import express from "express";
import { inventoryController } from "../controllers/inventory.controller.js";
import { authenticate, authenticateAdmin } from "../middelware/jwt_middleware.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API endpoints for managing product inventory
 */

/**
 * @swagger
 * /inventory/add:
 *   post:
 *     summary: Add stock to inventory
 *     tags: [Inventory]
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
 *                 description: The ID of the product
 *                 example: 64b2d8f5e4e11f8a1b234567
 *               quantity:
 *                 type: number
 *                 description: Quantity of stock to add
 *                 example: 100
 *     responses:
 *       201:
 *         description: Stock added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 */

/**
 * @swagger
 * /inventory/deduct:
 *   post:
 *     summary: Deduct stock from inventory
 *     tags: [Inventory]
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
 *                 description: The ID of the product
 *                 example: 64b2d8f5e4e11f8a1b234567
 *               quantity:
 *                 type: number
 *                 description: Quantity of stock to deduct
 *                 example: 50
 *     responses:
 *       201:
 *         description: Stock deducted successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 */

/**
 * @swagger
 * /inventory/check:
 *   post:
 *     summary: Check stock availability for a product
 *     tags: [Inventory]
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
 *                 description: The ID of the product
 *                 example: 64b2d8f5e4e11f8a1b234567
 *     responses:
 *       200:
 *         description: Stock availability details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   description: The ID of the product
 *                 availableStock:
 *                   type: number
 *                   description: The available stock quantity
 *                   example: 150
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 */

router.post("/add", authenticateAdmin, inventoryController.addStock); // Admin adds stock
router.post("/deduct", authenticateAdmin, inventoryController.deductStock); // Admin manually deducts stock
router.post("/check", authenticate, inventoryController.checkStock); // Check stock availability for products

export default router;
