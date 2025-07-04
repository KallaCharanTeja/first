import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv'
import apiKeyMiddleware from './middleware/apiKey.js';
import currencyRoutes from './routes/currency.js';

dotenv.config()

const app = express();
const port = 5000

app.use('/api/currency/', apiKeyMiddleware,currencyRoutes)

app.listen(port,()=>{
    console.log(`Server is running in ${port}`)
})
