import express from "express";
import { couponController } from "../controllers/coupon.controller.js";
import { authenticate, authenticateAdmin } from "../middelware/jwt_middleware.js";

const router = express.Router();

router.post("/", authenticateAdmin, couponController.createCoupon); // Admin creates a coupon
router.post("/apply", authenticate, couponController.applyCoupon); // User applies a coupon

export default router;
