import { Product } from "../models/ecommerce/product.models.js";
import mongoose from "mongoose";

export const productService = {
    getAll: async () => {
        return await Product.find().populate('category')
    },
    getById: async (id) => {
        return await Product.findById(id);
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
    }

    
};
