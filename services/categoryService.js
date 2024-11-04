import { Category } from './../models/ecommerce/categoery.models.js';

export const categoryService = {
    getAll: async () => {
        return await Category.find();
    },
    create: async (data) => {
        const category = new Category(data);
        return await category.save();
    },
};
