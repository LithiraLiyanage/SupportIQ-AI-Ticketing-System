const mongoose=require("mongoose");
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},action:String,entityType:String,entityId:String,description:String,ipAddress:String},{timestamps:true});
module.exports=mongoose.model("AuditLog",schema);
