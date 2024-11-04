import { Product } from './../models/ecommerce/product.models.js';

export const productService = {
    getAll: async () => {
        return await Product.find().populate('category');
    },
    create: async (data) => {
        const product = new Product(data);
        return await product.save();
    },
    // Add more methods for update, delete, etc.
};
