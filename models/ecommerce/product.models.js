import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    averageRating: {
        type: Number,
        default: 0
    
    },
    numReviews: {
        type: Number,
        default: 0, // Total number of reviews
      },
     // Flash Sale Fields
     isFlashSale: {
        type: Boolean,
        default: false,
    },
    flashSalePrice: {
        type: Number,
    },
    flashSaleEndDate: {
        type: Date,
    },
    image: {
        type: String, // URL or path to the image
        required: false // Optional: set to `false` if images are not mandatory
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
