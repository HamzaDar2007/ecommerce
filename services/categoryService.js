import { Category } from '../models/ecommerce/category.models.js';
import { Product } from '../models/ecommerce/product.models.js';

export const categoryService = {
    getAll: async () => {
        return await Category.find();
    },
    getById: async (id) => {
        return await Category.findById(id);
    },
    create: async (data) => {
        const existingCategory = await Category.findOne({ name: data.name})

        if (existingCategory) {
            throw new Error("Category with this name already exists")
        }

        const category = new Category(data);
        return await category.save();
    },
    update: async (id, data) => {
        return await Category.findByIdAndUpdate(id, data, { new: true });
    },
    delete: async (id) => {
        return await Category.findByIdAndDelete(id);
    },
    
};

