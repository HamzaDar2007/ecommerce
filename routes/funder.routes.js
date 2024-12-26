import express from "express";
import { funderController } from "../controllers/funder.controller.js";
import { authenticateAdmin } from "../middelware/jwt_middleware.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Funders
 *   description: API endpoints for managing funders and contributions
 */

/**
 * @swagger
 * /funders:
 *   post:
 *     summary: Add a new funder
 *     tags: [Funders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the funder
 *                 example: John Doe
 *               description:
 *                 type: string
 *                 description: Description of the funder
 *                 example: Regular contributor for social causes
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 description: Status of the funder
 *                 example: active
 *     responses:
 *       201:
 *         description: Funder added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 */

/**
 * @swagger
 * /funders:
 *   get:
 *     summary: Retrieve all funders
 *     tags: [Funders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of funders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [active, inactive]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /funders/{id}:
 *   get:
 *     summary: Retrieve a specific funder by ID
 *     tags: [Funders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the funder
 *     responses:
 *       200:
 *         description: Funder details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [active, inactive]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Funder not found
 */

/**
 * @swagger
 * /funders/contribute:
 *   post:
 *     summary: Record a contribution
 *     tags: [Funders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               funderId:
 *                 type: string
 *                 description: The ID of the funder
 *               amount:
 *                 type: number
 *                 description: The contribution amount
 *                 example: 500
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the contribution
 *                 example: 2024-01-01
 *     responses:
 *       201:
 *         description: Contribution recorded successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 */

/**
 * @swagger
 * /funders/{id}:
 *   put:
 *     summary: Update a funder by ID
 *     tags: [Funders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the funder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the funder
 *               description:
 *                 type: string
 *                 description: Updated description
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 description: Updated status of the funder
 *     responses:
 *       200:
 *         description: Funder updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 */

/**
 * @swagger
 * /funders/{id}:
 *   delete:
 *     summary: Delete a funder by ID
 *     tags: [Funders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the funder
 *     responses:
 *       200:
 *         description: Funder deleted successfully
 *       404:
 *         description: Funder not found
 *       401:
 *         description: Unauthorized (Admin only)
 */


router.post("/", authenticateAdmin, funderController.addFunder); // Add a new funder
router.get("/", authenticateAdmin, funderController.getFunders); // Get all funders
router.get("/:id", authenticateAdmin, funderController.getFunderById); // Get a specific funder
router.post("/contribute", authenticateAdmin, funderController.recordContribution); // Record a contribution
router.put("/:id", authenticateAdmin, funderController.updateFunder); // Update funder details
router.delete("/:id", authenticateAdmin, funderController.deleteFunder); // Delete a funder

export default router;





