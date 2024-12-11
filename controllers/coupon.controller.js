import { couponService } from "../services/coupon.service.js";

export const couponController = {
    createCoupon: async (req, res) => {
        try {
            const coupon = await couponService.createCoupon(req.body);
            res.status(201).json(coupon);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    applyCoupon: async (req, res) => {
        try {
            const { code, cartTotal } = req.body;
            const discount = await couponService.applyCoupon(code, cartTotal);
            res.status(200).json(discount);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};
