const redis = require('../model/blacklist');

async function userAuth(req, res) {
    const token = req.cookies.token;

    if(!token){
        res.status(209).json({
            message : "Token not found"
        })
    }

    const isTokenExist = redis.get(token)

    if(isTokenExist){
        res.status(409).json({
            message : "Token is invalid"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded
    } catch (err) {
        console.log(err)
    }
}

module.exports = { userAuth }
