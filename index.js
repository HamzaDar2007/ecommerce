import express from "express"
import {resolve} from "path"
import mongoose from "mongoose";
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 3000;
app.use(express.json()); 

app.use(express.static('static'));

mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});