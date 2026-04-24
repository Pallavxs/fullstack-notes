import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token)

    res.status(200).json({
        message,
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}

export async function register(req, res) {
    const { email, contact, password, fullname, isSeller } = req.body;

    try{
        const existingUser = await userModel.findOne({ 
            $or: [
                { email },
                { contact }
            ]
        });

        if(existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }
        
        const user = await userModel.create({
            email, contact, password, fullname, role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "User registered successfully");

    } catch(error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}