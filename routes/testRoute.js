import express, { Router } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
const router = express.Router();


// register users/ manufactures/ distributers/ retailers/ and customers based on role
router.post("/register", async (req, res) => {
  try {
    const userData = req.body; 

    const { username, email, password, phone, location, role } = userData; 
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      phone,
      location,
      role,
    });

    await user.save();
    let userRole = user.role

    res.status(201).json({ message:`${userRole} is registered successfully` }); // Corrected the message
  } catch (error) {
    console.error("Error adding users:", error);
    res.status(500).json({ error: "Failed to add users" });
  }
});

export default router;