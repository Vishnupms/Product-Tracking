
import createHttpError from 'http-errors';

export const verifyDistributor = (req, res, next) => {
 
 const distributor = req.user.role === "distributor" 
 if(!distributor){
    return next(createHttpError(401,'Unauthorized'));
 }
    next();
}
