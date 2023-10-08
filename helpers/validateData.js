import { body, validationResult } from "express-validator";

export function validateData(schema) {
  return [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("phone").isMobilePhone("any", { strictMode: false }),
    body("location").notEmpty(),
    body("role").notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
}
