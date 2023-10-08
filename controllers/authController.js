import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';


export const login = async (req, res, next) => {
    const email = req.body.email
    const passwordRaw = req.body.password
    try {
        const user = await userModel.findOne({ email })
        if (!user) return res.status(404).json({ error: "User Not Found" });
        const passwordValidate = await bcrypt.compare(passwordRaw, user.password)
        if (!passwordValidate) return res.status(401).json({ error: "Invalid credentials" });
        
        const token = jwt.sign({
            userId: user._id,
            role:user.role
        }, process.env.JWT_SECRET, { expiresIn: "24h" })
        return res.json({success:true ,token, msg: "Login successful.." });
    } catch (error) {
        next(error)
    }
}