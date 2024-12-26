import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { swaggerSpec, swaggerUiMiddleware } from "./swagger.js";
import swaggerUi from "swagger-ui-express";

import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js"
import inventoryRoutes from "./routes/inventory.routes.js"; 
import invoiceRoutes from "./routes/invoice.routes.js";
import funderRoutes from "./routes/funder.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import couponRoutes from "./routes/coupon.routes.js";


dotenv.config();

const app = express();
const port = 3000;

app.use(express.json()); // Ensure this line is present

app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/invoices", invoiceRoutes);
app.use("/api/funders", funderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUiMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
