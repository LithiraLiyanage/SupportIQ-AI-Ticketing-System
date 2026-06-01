const router=require("express").Router();const c=require("../controllers/authController");const{protect}=require("../middleware/authMiddleware");const validate=require("../middleware/validateMiddleware");const{registerRules,loginRules}=require("../validators/authValidators");
router.post("/register",registerRules,validate,c.register);router.post("/login",loginRules,validate,c.login);router.get("/me",protect,c.me);router.put("/change-password",protect,c.changePassword);module.exports=router;
// Dev-only shortcut to get a valid token for demo users (non-production)
if (process.env.NODE_ENV !== 'production') {
	router.post('/dev-login', c.devLogin);
}
module.exports = router;
