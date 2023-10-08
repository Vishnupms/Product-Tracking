
import createHttpError from 'http-errors';

export const verifyManufacturer = (req, res, next) => {
 
 const manufacturer = req.user.role === "manufacturer" 
 if(!manufacturer){
    return next(createHttpError(401,'Unauthorized'));
 }
    next();
}
