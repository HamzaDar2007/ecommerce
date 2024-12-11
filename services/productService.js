import { getProductById } from "../controllers/productController.js";
import { Product } from "../models/ecommerce/product.models.js";
import mongoose from "mongoose";


export const productService = {
    getAll: async () => {
        return await Product.find().populate('category')
    },

    getProduct: async (productId) => {
        console.log("Product ID received:", productId); // Debug log
    
        const product = await Product.findById(productId);
    
        if (!product) {
            console.log("Product not found with ID:", productId); // Debug log
            throw new Error("Product not found.");
        }
    
        // Check if flash sale is active
        const now = new Date();
        console.log("Current date and time:", now); // Debug log
        if (product.isFlashSale && product.flashSaleEndDate > now) {
            console.log("Flash sale is active for product:", product.name); // Debug log
            return {
                ...product.toObject(),
                price: product.flashSalePrice, // Override the price with flash sale price
            };
        }
    
        console.log("Returning regular product:", product.name); // Debug log
        return product;
    },
    
    create: async (data) => {
        const product = new Product(data);
        return await product.save();
    },
    update: async (id, data) => {
        return await Product.findByIdAndUpdate(id, data, { new: true });
    },
    delete: async (id) => {
        return await Product.findByIdAndDelete(id);
    },
    getAllProductByCategoryId: async (categoryId) => {
        console.log("Finding products with category ID:", categoryId);
        return await Product.find({ category: categoryId })
    },
    getAllProductsByUserId: async (userId) => {
        return await Product.find({ owner: userId });
    },
    setFlashSale: async (productId, flashSalePrice, flashSaleEndDate) => {
        const product = await Product.findById(productId);

        if (!product) throw new Error("Product not found.");

        // Update flash sale fields
        product.isFlashSale = true;
        product.flashSalePrice = flashSalePrice;
        product.flashSaleEndDate = new Date(flashSaleEndDate);

        return await product.save();
    }  

};
