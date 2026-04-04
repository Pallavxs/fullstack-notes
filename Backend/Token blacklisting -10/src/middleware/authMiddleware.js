const jwt = require('jsonwebtoken')

async function getMe(req,res,next){
    try {
        const token = req.cookie.token 
    
        if(!token){
            res.status(401).json({
                message: "Unauthorized access"
            })
        }
    
        const decoded = jwt.verify(token,env.process.JWT_Sign)
    
        req.user = decoded
    
        next();

    } catch (err) {
        res.status(401).json({
            message: "Unauthorized access or invalid token"
        })
    }
}

module.exports = getMe;