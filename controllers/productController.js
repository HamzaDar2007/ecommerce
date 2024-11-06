import { productService } from '../services/productService.js';

export const getAllproducts = async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.update(req.params.id, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.delete(req.params.id);
        if (deletedProduct) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const allProductByCategory = async (req, res) => {
    const {categoryId} = req.params
    try {
        const products = await productService.getAllProductByCategoryId(categoryId)
        console.log('all products', products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const allProductsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const products = await productService.getAllProductsByUserId(userId);
        console.log("Fetched products for user:", userId, products);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by user:", error.message);
        res.status(500).json({ message: error.message });
    }
};
