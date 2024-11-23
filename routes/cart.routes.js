import express from "express";
import { cartController } from "../controllers/cartController.js";
import { authenticate } from "../middelware/jwt_middleware.js";


const router = express.Router();

router.get("/", authenticate, cartController.getCart);
router.post("/add", authenticate, cartController.addToCart); 
router.post("/remove", authenticate, cartController.removeFromCart); 
router.post("/clear", authenticate, cartController.clearCart); 

export default router;
