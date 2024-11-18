import express from 'express';
import { registerCustomer, login } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', login);

export default router;
