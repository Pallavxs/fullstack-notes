import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import cookie from 'cookie-parser';
import sessionModel from '../model/session.model.js';

// Why do we hash the refresh token when storing it in the database,
// but when validating it on refresh, you can't just query by hash directly?
// Instead, you hash again and look for that hash? Why not store the plain token?

export async function register(req, res) {
    const { username, email, password } = req.body;

    const verifiedUser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (verifiedUser) {
        return res.status(409).json({
            message: "user's username or email is already exist"
        })
    }

    const hashPass = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email, password: hashPass
    })

    const refreshToken = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10)

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    }, config.JWT_SECRET, {
        expiresIn: "15m"
    })


    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: "User registered sucessfully",
        user: user,
        accessToken
    })

}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(409).json({
            message : "user email not valid"
        })
    }

    // const hashPass = bcrypt.hash(password,10) 
    
    const isPasswordValid = bcrypt.compare(password,user.password) // automatic decrypt

    if(!isPasswordValid){
        return res.status(409).json({
            message : "password is invalid"
        })
    }

    const refreshToken = jwt.sign({
        id : user._id
    },config.JWT_SECRET,{
        expiresIn : '7d'
    })

    const refreshTokenHash = await bcrypt.hash(refreshToken,10)

    const session = await sessionModel.create({
        user : user._id,
        refreshTokenHash,
        ip : req.ip,
        userAgent : req.headers[ "user-agent" ]
    })

    const accessToken = jwt.sign({
        id: user._id,
        sessionId : session._id
    }, config.JWT_SECRET,{
        expiresIn : "15m"
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly : true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message : "user successfully registered",
        user: {
            username : user.username,
            email : user.email
        },
        accessToken
    })


}

export async function getMe(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message: "User fetched sucessfully",
        user: user
    })
}

export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(409).json({
            message: "Refresh Token expired"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)

    const sessions = await sessionModel.find({
        user : decoded.id,
        revoked: false
    })

    let session = null;
    for(let s of sessions){
        const isValid = await bcrypt.compare(refreshToken,s.refreshTokenHash)
        if(isValid){
            session = s;
            break;
        }
    }

    if (!session) {
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }

    const accessToken = jwt.sign({
        id: decoded.id
    }, config.JWT_SECRET, {
        expiresIn: '15m'
    })

    const newRefreshToken = jwt.sign({
        id: decoded.id
    }, config.JWT_SECRET, {
        expiresIn: '7d'
    })

    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10)

    session.refreshTokenHash = newRefreshTokenHash
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: "new tokens is created",
        accessToken
    })


}

export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: "token not found"
        })
    }

    const decoded = await jwt.verify(refreshToken,config.JWT_SECRET)

    if(!decoded){
        return res.status(409).json({
            message : "token is invalid"
        })
    }

    const sessions = await sessionModel.find({
        user : decoded.id,
        revoked : false
    })

    let session = null;
    for (let s of sessions) {
        const isValid = await bcrypt.compare(refreshToken, s.refreshTokenHash);
        if (isValid) {
            session = s;
            break;
        }
    }

    if (!session) {
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }


    session.revoked = true;
    await session.save();

    res.clearCookie('refreshToken')

    res.status(200).json({
        message: "user is successfully logout"
    })
}

export async function logoutAll(req, res) {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) {
        return res.status(400).json({
            message : "Refresh token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)

    await sessionModel.updateMany({
        user : decoded.id,
        revoked : false
    },{
        revoked : true
    })

    res.clearCookie("refreshToken")

    res.status(200).json({
        message : "logout-all sucessfull"
    })
}