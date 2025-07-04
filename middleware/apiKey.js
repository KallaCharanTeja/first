export default function apiKeyMiddleware(req,res,next){
    const userKey = req.header('x-api-key')
    const validKey = process.env.API_KEY
    console.log(userKey,validKey)
    if(!userKey || userKey !== validKey){
        return res.status(200).json({message : "Please enter a valid api key"})
    }
    next();
}