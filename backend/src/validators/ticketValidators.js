const{body}=require("express-validator");
exports.ticketCreateRules=[body("title").trim().isLength({min:5,max:120}).withMessage("Title must be 5-120 characters"),body("description").trim().isLength({min:20,max:5000}).withMessage("Description must be 20-5000 characters")];
exports.commentRules=[body("message").trim().isLength({min:1,max:2000}).withMessage("Comment must be 1-2000 characters")];
