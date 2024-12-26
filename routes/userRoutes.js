import express from 'express';
import { registerCustomer, login } from '../controllers/userController.js';
import { authenticate } from '../middelware/jwt_middleware.js';


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or email already in use
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /users/protected:
 *   get:
 *     summary: Access a protected route
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user info if authenticated
 *       401:
 *         description: Unauthorized access
 */

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', login);

router.get('/protected', authenticate, (req, res) => {
    res.status(200).json({ message: `Hello, ${req.user.email}!`, user: req.user });
});

export default router;


