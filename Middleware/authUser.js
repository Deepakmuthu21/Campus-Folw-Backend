import jwt from "jsonwebtoken"
import dotenv from "dotenv";


dotenv.config();


const userAuthMiddleware = async(req,res,next)=>{

    try {
        
        const token = req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(400).json({message:"Token not found"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
                        return res.status(400).json({message:"Invalid Token"})

        }

        req.user = decoded

        
        next()


    } catch (error) {
        
    }
}

export default userAuthMiddleware;