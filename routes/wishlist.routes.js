import express from "express";
import { authenticate } from "../middelware/jwt_middleware.js";
import { wishlistController } from "../controllers/wishlistController.js";
const router = express.Router();

router.get("/", authenticate, wishlistController.getWishlist); 
router.post("/add", authenticate, wishlistController.addToWishlist); 
router.post("/remove", authenticate, wishlistController.removeFromWishlist); 
router.post("/clear", authenticate, wishlistController.clearWishlist); 
router.post("/share", authenticate, wishlistController.shareWishlist);


export default router;
