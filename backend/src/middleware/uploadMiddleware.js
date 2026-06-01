const multer=require("multer"),path=require("path"),fs=require("fs-extra");const dir=path.join(__dirname,"../uploads");fs.ensureDirSync(dir);const allowed=[".png",".jpg",".jpeg",".pdf",".txt",".zip"];
const storage=multer.diskStorage({destination:(_,__,cb)=>cb(null,dir),filename:(_,file,cb)=>cb(null,Date.now()+"-"+file.originalname.replace(/\s+/g,"-"))});
module.exports=multer({storage,fileFilter:(_,file,cb)=>allowed.includes(path.extname(file.originalname).toLowerCase())?cb(null,true):cb(new Error("Invalid file type")),limits:{fileSize:Number(process.env.MAX_FILE_SIZE||5242880),files:5}});
