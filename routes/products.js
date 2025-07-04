import express from 'express';
import axios from 'axios';
import fs from 'fs/promises';
import { json } from 'stream/consumers';
const filepath = 'E:/affordmedec/data/products.json';

const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        const data = await fs.readFile('E:/affordmedec/data/products.json');
        const products = JSON.parse(data);
        res.status(200).json(products);
    }catch(error){
        res.status(404).json({message:"couln't fetch data"});
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const data = await fs.readFile('E:/affordmedec/data/products.json');
        const id = parseInt(req.params.id);
        const products = JSON.parse(data);
        const index = products.find((u) =>{
            return u.id === id;
        });
        if(index){
            return res.status(200).json(index);
        }
        return res.json({message : "ID not found"});
    }catch(error){
        res.status(404).json({message:"couln't fetch data"});
    }
});


router.post('/',async(req,res)=>{
    try{
        const newContent = req.body;
        const data = await fs.readFile(filepath);
        const products = JSON.parse(data);

        const newId = products.length > 0?products[products.length-1].id + 1: 1;
        const productWithId = {id : newId,...newContent};

        products.push(productWithId);

        await fs.writeFile(filepath,JSON.stringify(products,null,2));

        res.status(200).json({message : "product added ", products : productWithId});
    }catch(error){
        res.status(404).json("couldn't add product");
    }
});


router.put('/:id',async(req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const body = req.body;
        
        const data = await fs.readFile(filepath);
        let products = JSON.parse(data);

        const index = products.findIndex((i)=>{
            return i.id === id;
        });

        if(index === -1){
            return res.json({message:"id not found"});
        }
        products[index] = {id: id,...body};
        await fs.writeFile(filepath,JSON.stringify(products,null,2));

        res.status(200).json({message : "product updated",product : products[index]});
    }
    catch(error){
        res.status(404).json({message:"couldn't put the data"});
    }
});

router.delete('/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    
    const data = await fs.readFile(filepath);
    let products = JSON.parse(data);

    const index = products.findIndex((p)=> p.id === id);
    if(index === -1){
        return res.status(404).json({message:"id not found"});
    }

    const deleteProducts = products.splice(index,1)[0];
    await fs.writeFile(filepath,JSON.stringify(products,null,2));

    return res.status(200).json({message:"Product deleted successfully",product : deleteProducts})
});
export default router;

