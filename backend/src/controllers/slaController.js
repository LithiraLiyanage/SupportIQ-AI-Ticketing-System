const asyncHandler=require("../utils/asyncHandler");const SlaRule=require("../models/SlaRule");
exports.list=asyncHandler(async(req,res)=>res.json(await SlaRule.find()))
exports.create=asyncHandler(async(req,res)=>res.status(201).json(await SlaRule.create(req.body)))
exports.update=asyncHandler(async(req,res)=>res.json(await SlaRule.findByIdAndUpdate(req.params.id,req.body,{new:true})))
