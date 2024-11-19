import express from 'express';
import { registerCustomer, login } from '../controllers/userController.js';
import { authenticate } from '../middelware/jwt_middleware.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', login);

router.get('/protected', authenticate, (req, res) => {
    res.status(200).json({ message: `Hello, ${req.user.email}!`, user: req.user });
});

export default router;


