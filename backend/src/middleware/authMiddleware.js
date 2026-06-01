const jwt=require("jsonwebtoken");const User=require("../models/User");
const protect=async(req,res,next)=>{try{const h=req.headers.authorization;if(!h||!h.startsWith("Bearer "))return res.status(401).json({message:"Not authorized"});const decoded=jwt.verify(h.split(" ")[1],process.env.JWT_SECRET||"dev_secret");const user=await User.findById(decoded.id).select("-password");if(!user||user.status!=="active")return res.status(401).json({message:"Account disabled or not found"});req.user=user;next()}catch(e){res.status(401).json({message:"Invalid or expired token"})}};
const authorize=(...roles)=>(req,res,next)=>{if(!roles.includes(req.user.role))return res.status(403).json({message:"Access denied"});next()};
module.exports={protect,authorize};
