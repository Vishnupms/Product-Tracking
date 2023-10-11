import { param, validationResult } from 'express-validator';

export function validateProductId() {
  return [
    param('productId')
      .notEmpty()
      .isMongoId()
      .withMessage('productId must be a non-empty valid MongoDB ObjectId'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
}
