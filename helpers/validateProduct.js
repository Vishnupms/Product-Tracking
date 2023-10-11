import { body, validationResult } from "express-validator";
export const validateProduct = [
    body('name').isString().notEmpty(),
    body('description').isString().notEmpty(),
    body('price').isNumeric().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  

 
  
  
  
  
  