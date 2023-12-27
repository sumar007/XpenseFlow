import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import User from "../models/usermodel.js";

dotenv.config();

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/registration", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body, "body");
  const username = name;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    console.log(existingUser, "called");
    if (existingUser) {
      console.log("exists");
      return res.status(500).json({ message: "User already exists" });
    }

    const verificationCode = crypto.randomBytes(3).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(verificationCode, "code");
    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
    });
    console.log(verificationCode);
    const savedUser = await user.save();

    sendVerificationEmail(email, verificationCode);

    console.log("User saved:", savedUser);
    res.status(201).json({
      message: "Registration successful. Check your email for verification.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/verify", async (req, res) => {
  const { email, verificationCode } = req.body;
  console.log(req.body);
  console.log("Request to /verify:", req.body);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user, "user");

    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      await user.save();
      console.log("Verification successful");
      return res.status(200).json({ message: "Email verification successful" });
    } else {
      return res.status(401).json({ message: "Incorrect verification code" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

function sendVerificationEmail(email, code) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Account Verification",
    text: `Your verification code is: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// Login route
router.post("/login", async (req, res) => {
  // Retrieve login credentials from the request body
  const { email, password } = req.body;
 
  try {
    // Find the user in the database
    const user = await User.findOne({ email });
  
    if (!email) {
      return res.status(404).json({ message: "email not found" });
    }
    // Check if the user is verified before attempting to compare passwords
    if (!user.isVerified) {
      return res.status(400).json({
        message: "User not verified. Check your email for verification.",
      });
    }
    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      // Password doesn't match
      return res.status(400).json({ message: "Incorrect password" });
    }
    // Password matches, login successful
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(400).json({ message: "Login error" });
  }
});

// Google Signin route
router.post("/google-signin", async (request, response) => {
  const { email, picture } = request.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      const newUser = new User({
        email,
        // profile_picture: picture,
      });

      await newUser.save();

      const payload = {
        email,
      };

      const jwt_token = jwt.sign(payload, process.env.JWT_SECRET);
      response.send({ jwt_token });
    } else {
      const payload = {
        email,
      };

      const jwt_token = jwt.sign(payload, "sdfghjkfdgh");
      response.send({ jwt_token });
    }
  } catch (error) {
    console.error("Google signin error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default router;
