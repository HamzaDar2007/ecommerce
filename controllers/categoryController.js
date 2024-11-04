import { categoryService } from '../services/categoryService.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


