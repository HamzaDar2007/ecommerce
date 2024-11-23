import express from "express";
import { authenticate } from "../middelware/jwt_middleware.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", authenticate, getWishlist);
router.post("/add", authenticate, addToWishlist);
router.post("/remove", authenticate, removeFromWishlist);

export default router;
