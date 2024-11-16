import mongoose from "mongoose"
const orderItemsSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type: Number,
        required: true
    }
})
const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: {
        type: [orderItemsSchema]
    },
    status: {
        type: String,
        required: true,
        enum: ["PENDING", "CANCELLED", "DELIVERED"],
        default: "PENDING"
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
    address: {
        type: String,
        required: true
    }
}, {timestampes: true})
export const Order = mongoose.model("Order", orderSchema)