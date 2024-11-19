// routes/order.routes.js
import express from "express";
import { orderController } from "../controllers/orderController.js";
import { authenticate } from '../middelware/jwt_middleware.js'

const router = express.Router();

router.post("/", authenticate, orderController.createOrder);
router.get("/", authenticate, orderController.getAllOrders); 
router.get("/:id", authenticate, orderController.getOrderById); 
router.put("/:id", authenticate, orderController.updateOrder); 
router.delete("/:id", authenticate, orderController.deleteOrder); 


export default router;
