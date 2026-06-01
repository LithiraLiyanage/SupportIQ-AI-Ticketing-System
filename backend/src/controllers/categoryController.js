const asyncHandler=require("../utils/asyncHandler");const Category=require("../models/Category");
exports.list=asyncHandler(async(req,res)=>res.json(await Category.find({isActive:true})));
exports.create=asyncHandler(async(req,res)=>res.status(201).json(await Category.create(req.body)));
exports.update=asyncHandler(async(req,res)=>res.json(await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})));
exports.remove=asyncHandler(async(req,res)=>{await Category.findByIdAndUpdate(req.params.id,{isActive:false});res.json({message:"Category disabled"})});
