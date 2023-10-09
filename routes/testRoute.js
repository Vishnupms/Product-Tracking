import express, { Router } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
const router = express.Router();
router.post("/test-data", async (req, res) => {
    try {
      const usersData = req.body;
      console.log(req.body);
  
      for (const userData of usersData) {
        const { username, email, password, phone, location, role } = userData;
        const existingUser = await userModel.findOne({ email });
  
        if (existingUser) {
          console.error("Email address is already taken:", email);
          continue;
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
      }
  
      res.status(201).json({ message: "Manufature, Distributer, Retailer, and Customer datas are added to database successfully" });
    } catch (error) {
      console.error("Error adding users:", error);
      res.status(500).json({ error: "Failed to add users" });
    }
  });
  
  export default router;