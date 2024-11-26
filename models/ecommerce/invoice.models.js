import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Refers to the Product model
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    price: {
        type: Number,
        required: true, // Unit price of the product at the time of invoicing
    },
});

const invoiceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Refers to the User model
            required: true,
        },
        items: [invoiceItemSchema], // List of invoice items
        totalAmount: {
            type: Number,
            required: true, // Total amount for the invoice
            default: 0,
        },
        status: {
            type: String,
            enum: ["PENDING", "PAID", "CANCELLED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
