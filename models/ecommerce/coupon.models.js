import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discountType: {
        type: String,
        enum: ["PERCENTAGE", "FIXED"],
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    usageLimit: {
        type: Number,
        default: 1,
    },
    usedCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export const Coupon = mongoose.model("Coupon", couponSchema);
