const mongoose=require("mongoose");
const schema=new mongoose.Schema({ticket:{type:mongoose.Schema.Types.ObjectId,ref:"Ticket",required:true},author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},message:{type:String,required:true,maxlength:2000},isInternal:{type:Boolean,default:false},attachments:[{fileName:String,fileUrl:String,fileType:String,size:Number}]},{timestamps:true});
module.exports=mongoose.model("Comment",schema);
