import express from "express";
import { invoiceController } from "../controllers/invoice.controller.js";
import { authenticate } from "../middelware/jwt_middleware.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API endpoints for managing invoices
 */

/**
 * @swagger
 * /invoices/create:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user for whom the invoice is created
 *                 example: 64b2d8f5e4e11f8a1b234567
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: The ID of the product
 *                       example: 64b2d8f5e4e11f8a1b234567
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the product
 *                       example: 2
 *               totalAmount:
 *                 type: number
 *                 description: Total amount for the invoice
 *                 example: 150.5
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /invoices/my-invoices:
 *   get:
 *     summary: Get the authenticated user's invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the user's invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                   totalAmount:
 *                     type: number
 *                   status:
 *                     type: string
 *                     enum: [pending, paid, cancelled]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /invoices/update-status:
 *   post:
 *     summary: Update the status of an invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceId:
 *                 type: string
 *                 description: The ID of the invoice
 *                 example: 64b2d8f5e4e11f8a1b234567
 *               status:
 *                 type: string
 *                 enum: [pending, paid, cancelled]
 *                 description: The new status of the invoice
 *                 example: paid
 *     responses:
 *       200:
 *         description: Invoice status updated successfully
 *       400:
 *         description: Invalid input or invoice not found
 *       401:
 *         description: Unauthorized
 */

router.post("/create", authenticate, invoiceController.createInvoice); // Create an invoice
router.get("/my-invoices", authenticate, invoiceController.getUserInvoices); // Get user's invoices
router.post("/update-status", authenticate, invoiceController.updateInvoiceStatus); // Update invoice status

export default router;
