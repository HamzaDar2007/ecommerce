import express from 'express'
import { createProduct,  getProductById,   deleteProduct, updateProduct, getAllproducts, allProductByCategory, allProductsByUser} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllproducts);
router.get('/allProdcuts/:categoryId',allProductByCategory)
router.get('/allProductsByUser/:userId', allProductsByUser);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;