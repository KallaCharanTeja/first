import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async(req,res)=>{
    try{
    const currency = req.query.currency?.toUpperCase()
    
    const response = await axios.get("https://open.er-api.com/v6/latest/USD")
    const data = response.data.rates

    if(currency){
        if(data[currency]){
            return res.json({
                base : "USA",
                target : currency,
                rate : data[currency]
            })
        }
        res.status(404).json({message:"currency not found"})
    }
    res.status(200).json({
        base:"USA",
        data
    })
    }catch(error){
        console.log(error)
    }

})


export default router