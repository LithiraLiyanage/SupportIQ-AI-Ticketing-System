const mongoose=require("mongoose");
const schema=new mongoose.Schema({name:{type:String,required:true,unique:true},description:String,isActive:{type:Boolean,default:true},defaultPriority:{type:String,enum:["low","medium","high","critical"],default:"medium"}},{timestamps:true});
module.exports=mongoose.model("Category",schema);
