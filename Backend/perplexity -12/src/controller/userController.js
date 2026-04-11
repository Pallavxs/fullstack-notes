import userModel from "../model/userModel.js";
import sendEmail from "../services/mail.services.js";
import config from "../config/config.js";
import jwt from 'jsonwebtoken'
import cookie from "cookie-parser";
import bcrypt from "bcrypt"

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }]
    });

    if (isUserAlreadyExists) {
      throw new Error("user already existed");
    }

    const hashedPass = await bcrypt.hash(password,10)

    const user = await userModel.create({
      username,
      email,
      password : hashedPass,
    });

    const verifiedEmailToken = jwt.sign({
        email : user.email
    }, config.JWT_SECRET, {expiresIn : '1d'})

    res.cookie('token', verifiedEmailToken)

    const verifyUrl = `http://localhost:3000/api/auth/verification-email?token=${verifiedEmailToken}`;

    await sendEmail(
      email,
      "Verify Your Email to Get Started",
      `Hello ${username},

Welcome, and thank you for joining us.

To complete your registration, please verify your email by clicking the link below:

${verifyUrl}

If you did not create this account, you can safely ignore this message.

– Team`,

      `<h3>Hello ${username},</h3>

<p>Welcome, and thank you for joining us.</p>

<p>To get started, please confirm your email address by clicking the button below:</p>

<p>
<a href="${verifyUrl}" 
style="display:inline-block;padding:12px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-weight:500;">
Verify Email
</a>
</p>

<p>If the button doesn’t work, use this link:</p>

<p style="word-break:break-all;">${verifyUrl}</p>

<p>This step helps us keep your account secure.</p>

<p>If you did not create this account, you can safely ignore this email.</p>

<p><strong>– Team</strong></p>`
    );

    res.status(200).json({
      success: true,
      message: "user successfully register",
      user,
    });
  } catch (err) {
    next(err);
  }
}

export async function verifyEmail(req, res, next) {
  try {
    const { token } = req.query;

    if (!token) {
      throw new Error("Invalid or missing token");
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.verified) {
      return res.status(200).json({
        success: true,
        message: "Email already verified",
      });
    }       

    user.verified = true;
    await user.save();

    const html = 
        `
            <h1>Email Verified Successfully</h1>
            <p>Thank you for verifying your email. Your account is now active.</p>
            <a href="http://localhost:3000/login" style="display:inline-block;padding:10px 15px;background:#2563eb;color:#fff;text-decoration:none;border-radius:5px;">Go to Login</a>
        `

    res.send(html)

    
  }
    catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email})

        if(!user) {
            throw new Error("User credentials Invalid")
        }

        const comparePassword = await user.comparePassword(password)

        if(!comparePassword){
          throw new Error("Password credentials not matched with email.")
        }

        if(!user.verified) {
          return res.status(400).json({
            message : "Please verify your email before logging in",
            success : false,
            err : "Email not verified"
          })
        }

        const token = jwt.sign({
          id : user._id,
          username : user.username
        }, config.JWT_SECRET,{
          expiresIn : "7d"
        })

        res.cookie("token", token)

        res.status(200).json({ message : "user successfully login"})

    } catch (err) { 
        next(err)
    }
}

export async function getMe(req, res, next) {
  const userId = req.user.id

  if(!userId){
    throw new Error("User id not exist")
  }

  res.status(200).json({
    message: "User accounte found"
  })
}