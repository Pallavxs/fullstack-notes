const jwt = require('jsonwebtoken')
const blackListModel = "./model/blacklist"

async function getMe(req,res,next){
    const token = req.cookies.token 

    if(!token){
        res.status(401).json({
            message: "Unauthorized access"
        })
    }

    const tokenBlackListed = await blackListModel.findOne({ token })

    if(tokenBlackListed){
        res.status(401).json({
            message : "Token not found"
        })
    }
    try {
    
        const decoded = jwt.verify(token,env.process.JWT_Sign)
    
        req.user = decoded
    
        next();

    } catch (err) {
        res.status(401).json({
            message: "Unauthorized access or invalid token"
        })
    }

    
}

module.exports = {getMe};