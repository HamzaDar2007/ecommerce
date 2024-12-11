import express from 'express';
import { upload } from '../middelware/multer_middleWare.js';
import { createProduct, getProductById, deleteProduct, updateProduct, getAllproducts, allProductByCategory, allProductsByUser } from '../controllers/productController.js';
import { authenticate } from '../middelware/jwt_middleware.js'
import { productController } from "../controllers/productController.js";
import { authenticateAdmin } from "../middelware/jwt_middleware.js";
const router = express.Router();

router.get('/', getAllproducts);
router.get('/allProducts/:categoryId', allProductByCategory);
router.get('/allProductsByUser/:userId', allProductsByUser);


router.post('/', authenticate, upload.single('image'), createProduct);
router.get('/:id', authenticate, getProductById);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);
router.post("/flash-sale", authenticateAdmin, productController.setFlashSale);

export default router;
