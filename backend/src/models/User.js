const mongoose=require("mongoose");const bcrypt=require("bcryptjs");
const schema=new mongoose.Schema({name:{type:String,required:true,minlength:2},email:{type:String,required:true,unique:true,lowercase:true},password:{type:String,required:true},role:{type:String,enum:["customer","agent","admin"],default:"customer"},status:{type:String,enum:["active","disabled"],default:"active"},avatar:String,department:String,skills:[String],lastLogin:Date},{timestamps:true});
schema.pre("save",async function(next){if(!this.isModified("password"))return next();this.password=await bcrypt.hash(this.password,10);next()});
schema.methods.matchPassword=function(p){return bcrypt.compare(p,this.password)};
module.exports=mongoose.model("User",schema);
