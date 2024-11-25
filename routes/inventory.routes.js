import express from "express";
import { inventoryController } from "../controllers/inventory.controller.js";
import { authenticate, authenticateAdmin } from "../middelware/jwt_middleware.js";



const router = express.Router();

router.post("/add", authenticateAdmin, inventoryController.addStock); // Admin adds stock
router.post("/deduct", authenticateAdmin, inventoryController.deductStock); // Admin manually deducts stock
router.post("/check", authenticate, inventoryController.checkStock); // Check stock availability for products

export default router;
