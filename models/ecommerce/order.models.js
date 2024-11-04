import mongoose from "mongoose"
const oderItemsSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quanitity:{
        type: Number,
        required: true
    }
})
const oderSchema = new mongoose.Schema({
    oderPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    oderItems: {
        type: [oderItemsSchema]
    },
    address: {
        type: String,
        required: true,
        enum: ["PENDING", "CANCELLED", "DELIVERED"],
        default: "PENDING"
    }
}, {timestampes: true})
export const Oder = mongoose.model("Oder", oderSchema)