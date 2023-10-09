
import createHttpError from 'http-errors';

export const verifyCustomer = (req, res, next) => {
 
 const customer= req.user.role === "customer" 
 if(!customer){
    return next(createHttpError(401,'Unauthorized'));
 }
    next();
}
