const AuditLog=require("../models/AuditLog");
exports.logAudit=async(data)=>{try{await AuditLog.create(data)}catch(e){console.warn("Audit failed",e.message)}};
