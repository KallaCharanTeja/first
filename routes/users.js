import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        const city = req.query.city;
        const user = users.filter((u) =>{
            return u.address.city.toLowerCase().includes(city.toLowerCase());
        });
        if(user){
            return res.json(user);
        }
        else{
            return res.status(404).json({message : "given city not found"});
        }
    }
    catch(error){
        res.status(404).json({message:"failed to fetch users"});
    }
});

router.get('/data', async(req,res)=>{
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        res.json(users);
    }
    catch(error){
        res.status(404).json({message:"Failed to fetch data"});
    }
});

export default router;