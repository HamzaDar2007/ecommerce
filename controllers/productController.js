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
        const { description, name, price, stock, categoryId, owner } = req.body;

        const image = req.file ? req.file.path : null;

        const product = await productService.create({ description, name, price, stock, category: categoryId, owner, image });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getProductById = async (req, res) => {
    try {
        console.log("Fetching product with ID:", req.params.id); // Debug log
        const product = await productService.getProduct(req.params.id);
        console.log("Fetched product:", product); // Debug log
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error.message); // Debug log
        res.status(400).json({ message: error.message });
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
    const { categoryId } = req.params
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
export const productController = {
    // Other product methods...

    setFlashSale: async (req, res) => {
        try {
            const { productId, flashSalePrice, flashSaleEndDate } = req.body;

            const product = await productService.setFlashSale(
                productId,
                flashSalePrice,
                flashSaleEndDate
            );

            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};