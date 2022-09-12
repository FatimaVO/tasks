const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array().map((err) => err.msg);
    const message = errorsArray.join(". ");
    return res.status(400).json({
      status: "error",
      message: message,
    });
  }
  next();
};

const userValidators = [
  body("name")
    .isString()
    .withMessage("Name would be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .notEmpty()
    .withMessage("Name can not be empty"),
  body("email").isEmail().withMessage("Email must be a valid email"),
  body("password")
    .isString()
    .withMessage("Password would be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .notEmpty()
    .withMessage("Password can not be empty"),
  checkValidations,
];

module.exports = { userValidators };
