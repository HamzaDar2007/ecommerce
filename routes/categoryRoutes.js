import express from 'express';
import { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middelware/jwt_middleware.js'
const router = express.Router();

router.get('/', getAllCategories);



router.post('/',authenticate, createCategory); 
router.get('/:id',authenticate , getCategoryById);
router.put('/:id',authenticate , updateCategory);
router.delete('/:id',authenticate , deleteCategory);

export default router;
