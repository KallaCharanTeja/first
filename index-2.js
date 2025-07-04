import express from 'express';
import axios from 'axios';
import usersRoute from './routes/users.js';
import products from './routes/products.js';
const port = 5000;
const app = express();
app.use(express.json());
app.use('/api/products', products);
app.use('/api/users/', usersRoute);



 app.listen(port,()=>{
    console.log(`server running on port ${port}`)
 })