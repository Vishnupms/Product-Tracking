// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import createHttpError from "http-errors";
// import retailerModel from '../models/retailerModel';

// export const retailerRegister = async(req,res,next)=>{
//     try {
//         const { username, email, password, phone, location } = req.body;
    
//         const existingRetailer = await retailerModel.findOne({ email });
//         if (existingRetailer) return next(createHttpError(409, "Email address is already taken. Please choose another one or log in instead"));
    
//         const hashedPassword = await bcrypt.hash(password, 10);
    
//         const retailer = new retailerModel({
//           username,
//           email,
//           password: hashedPassword,
//           phone,
//           location,
//         });
    
//         // Save the manufacturer to the database
//         await retailer.save();
    
//         res.status(201).json({ message: "Retailer registered successfully" });
//       } catch (error) {
//         console.error("Error registering Retailer:", error);
//         res.status(500).json({ error: "Registration failed" });
//       }
// }

// export const retailerLogin = async (req, res, next) => {
//     const email = req.body.email
//     const passwordRaw = req.body.password
//     try {
//         const retailer = await retailerModel.findOne({ email })
//         if (!retailer) return next(createHttpError(404, "retailer not found"));
//         const passwordValidate = await bcrypt.compare(passwordRaw, retailer.password)
//         if (!passwordValidate) return next(createHttpError(404, "Password does not match"));
        
//         const token = jwt.sign({
//             retailerId: retailer._id,
//         }, process.env.JWT_SECRET, { expiresIn: "24h" })
//         return res.json({success:true ,token, msg: "Login successfull.." });
//     } catch (error) {
//         next(error)
//     }
// }

