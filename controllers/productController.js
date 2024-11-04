import { productService } from '../services/productService.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = await productService.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add more functions for update, delete, etc.
