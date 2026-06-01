const Notification=require("../models/Notification");
exports.createNotification=(data)=>Notification.create(data);
