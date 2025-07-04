import express from 'express';
import trainRoute from './routes/trains.js'

const app = express();
const port = 5000;

app.use(express.json())
app.use('/api/trains',trainRoute);

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})