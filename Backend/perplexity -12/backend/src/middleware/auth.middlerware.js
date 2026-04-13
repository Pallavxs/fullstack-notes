import config  from '../config/config.js'
import jwt from "jsonwebtoken"

export async function authMiddlerware(req, res, next) {
    
    try {
        const token = req.cookies.token;
    
        if(!token){
            throw new Error("token not found")
        }
    
        const decoded = jwt.verify(token, config.JWT_SECRET)
        
        if (!decoded.id && !decoded._id) {
            throw new Error("Invalid token payload: missing user ID. Please login again.")
        }
    
        req.user = decoded

        next()

    } catch (err) {
        next(err)
    }
}