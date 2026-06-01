const mongoose=require("mongoose");
const schema=new mongoose.Schema({priority:{type:String,enum:["low","medium","high","critical"],unique:true},firstResponseHours:Number,resolutionHours:Number,isActive:{type:Boolean,default:true}},{timestamps:true});
module.exports=mongoose.model("SlaRule",schema);
