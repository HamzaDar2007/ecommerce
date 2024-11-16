import express from 'express';
import { upload } from './../multer_middleWare.js';
import { createProduct, getProductById, deleteProduct, updateProduct, getAllproducts, allProductByCategory, allProductsByUser } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllproducts);
router.get('/allProducts/:categoryId', allProductByCategory);
router.get('/allProductsByUser/:userId', allProductsByUser);
router.post('/', upload.single('image'), createProduct); // Add upload middleware
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
