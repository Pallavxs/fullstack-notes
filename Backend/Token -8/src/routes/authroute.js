const userModel = require("../model/user.model");
const jwt = require('jsonwebtoken')
const express = require("express");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, phone_no } = req.body;

  const isEmailAlreadyUsed = await userModel.findOne({ email });

  if (isEmailAlreadyUsed) {
    return res.status(409).json({
      message: "USer already exist with this email address",
    });
  }

  const user = await userModel.create({
    username,
    email,
    phone_no,
  });

  const Token = jwt.sign(
    {
      id : user._id,
      email : user.email
    },
    process.env.JWT_SECRET
  )

  res.cookie("jwt_token", Token)

  res.status(201).json({
    message: "user is registerd",
    user
  });
});

module.exports = authRouter;
