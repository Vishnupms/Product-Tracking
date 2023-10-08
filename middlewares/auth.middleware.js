import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
 
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
      return res.status(401).json({ error: "Token not provided" });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
    if (err) {
        return res.status(401).json({ error: "Token is invalid" });
    }
    
   const user = await userModel.findOne({_id:decoded.userId,role:decoded.role})
   if(!user){
    return  res.status(401).json({ error: "Token is invalid" })
   }
   
    // Attach the distributorId to the request object for later use
    req.user = user;
    next();
  });
};
