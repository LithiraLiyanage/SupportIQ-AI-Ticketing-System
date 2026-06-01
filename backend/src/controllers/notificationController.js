const asyncHandler=require("../utils/asyncHandler");const Notification=require("../models/Notification");
exports.list=asyncHandler(async(req,res)=>res.json(await Notification.find({user:req.user._id}).sort("-createdAt")));
exports.markRead=asyncHandler(async(req,res)=>res.json(await Notification.findOneAndUpdate({_id:req.params.id,user:req.user._id},{isRead:true},{new:true})));
exports.readAll=asyncHandler(async(req,res)=>{await Notification.updateMany({user:req.user._id},{isRead:true});res.json({message:"All notifications marked as read"})});
