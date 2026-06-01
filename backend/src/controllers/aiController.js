const asyncHandler=require("../utils/asyncHandler");const{analyzeTicket}=require("../services/aiService");
exports.analyze=asyncHandler(async(req,res)=>res.json(await analyzeTicket(req.body)));
