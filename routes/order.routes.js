// routes/order.routes.js
import express from "express";
import { orderController } from "../controllers/orderController.js";


const router = express.Router();

// Route to create an order
router.post("/", orderController.createOrder);

// Route to get all orders
router.get("/", orderController.getAllOrders);

// Route to get a specific order by ID
router.get("/:id", orderController.getOrderById);

// Route to update an order by ID
router.put("/:id", orderController.updateOrder);

// Route to delete an order by ID
router.delete("/:id", orderController.deleteOrder);

export default router;
