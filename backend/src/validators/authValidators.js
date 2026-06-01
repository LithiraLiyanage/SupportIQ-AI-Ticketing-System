const{body}=require("express-validator");
exports.registerRules=[body("name").trim().isLength({min:2}).withMessage("Name must be at least 2 characters"),body("email").isEmail().withMessage("Valid email is required"),body("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).withMessage("Password must be at least 8 characters and include uppercase, lowercase and number")];
exports.loginRules=[body("email").isEmail().withMessage("Valid email is required"),body("password").notEmpty().withMessage("Password is required")];
