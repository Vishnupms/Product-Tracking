
import createHttpError from 'http-errors';

export const verifyRetailer = (req, res, next) => {
 
 const retailer = req.user.role === "retailer" 
 if(!retailer){
    return next(createHttpError(401,'Unauthorized'));
 }
    next();
}
