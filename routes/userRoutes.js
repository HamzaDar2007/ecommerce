import express from 'express';
import { registerCustomer} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerCustomer);


export default router;
