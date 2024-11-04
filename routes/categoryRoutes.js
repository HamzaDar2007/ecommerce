import express from 'express';
import { getAllCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);

// Add more routes for create, update, delete, etc.

export default router;
