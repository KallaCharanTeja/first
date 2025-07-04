import express from 'express';
import axios from 'axios';

const router = express.Router();
let data = null;

(async()=>{
    try{
        const response =await axios.get("https://api.irail.be/stations/?format=json");
        data = response.data.station;
    }catch (error) {
    console.error("Failed to fetch station data:", error.message);
    }
})();

router.get('/',async(req,res)=>{
    try{
        // const data = response.data;
        const search = req.query.search
        const startsWith = req.query.startsWith

        if(!data){
            return res.status(200).json({message:"Station data not loaded yet"})
        }


        if(search){
            const values = data.filter((value)=>{
            return value.name.toLowerCase().includes(search.toLowerCase())
            })
            if(values.length > 0){
                return res.status(200).json({message:"data found successfully",data : values})
            }
            return res.status(404).json({message:"Couln't find the data"})            
        }

        if(startsWith){
            const result = data.filter((u)=>{
            return u.name.toLowerCase().startsWith(startsWith.toLowerCase())
            })
            if(result.length>0 ){
            return res.status(200).json({message : "data found", data:result})
            }
        return res.status(404).json({message:"Data couldn't be found"})
        }


    return res.status(201).json({message : "Data retrieved successfully",product : data})
        
        
    }catch(error){
        console.log(`Couldn't fetch data ${error}`)
    }
});
export default router;