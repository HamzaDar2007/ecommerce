import { Coupon } from "../models/ecommerce/coupon.models.js";

export const couponService = {
    createCoupon: async (couponData) => {
        const coupon = new Coupon(couponData);
        return await coupon.save();
    },

    applyCoupon: async (code, cartTotal) => {
        const coupon = await Coupon.findOne({ code });
        if (!coupon) throw new Error("Invalid coupon code.");
        if (new Date() > coupon.expirationDate) throw new Error("Coupon has expired.");
        if (coupon.usedCount >= coupon.usageLimit) throw new Error("Coupon usage limit reached.");

        let discount = 0;
        if (coupon.discountType === "PERCENTAGE") {
            discount = (cartTotal * coupon.discountValue) / 100;
        } else if (coupon.discountType === "FIXED") {
            discount = coupon.discountValue;
        }

        // Increment usage
        coupon.usedCount += 1;
        await coupon.save();

        return { discount, finalTotal: cartTotal - discount };
    },
};
