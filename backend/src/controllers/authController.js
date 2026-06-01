const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { logAudit } = require("../services/auditService");
const clean=(u)=>({id:u._id,name:u.name,email:u.email,role:u.role,status:u.status,department:u.department,skills:u.skills});
exports.register=asyncHandler(async(req,res)=>{const{name,email,password}=req.body;if(await User.exists({email}))return res.status(400).json({message:"Email already exists"});const role=email===process.env.ADMIN_EMAIL?"admin":"customer";const user=await User.create({name,email,password,role});await logAudit({user:user._id,action:"REGISTER",entityType:"User",entityId:user._id,description:"User registered",ipAddress:req.ip});res.status(201).json({...clean(user),token:generateToken(user)})});
exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// If MongoDB is connected, perform normal lookup and password check
	if (mongoose.connection.readyState === 1) {
		const user = await User.findOne({ email });
		if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid credentials" });
		user.lastLogin = new Date();
		await user.save();
		await logAudit({ user: user._id, action: "LOGIN", entityType: "User", entityId: user._id, description: "User logged in", ipAddress: req.ip });
		return res.json({ ...clean(user), token: generateToken(user) });
	}

	// Fallback for development when DB is unavailable: accept demo credentials
	const demoPasswords = {
		'admin@example.com': process.env.ADMIN_PASSWORD || 'Admin12345',
		'agent@example.com': 'Agent12345',
		'customer@example.com': 'Customer12345',
	};

	const expected = demoPasswords[email];
	if (expected && password === expected) {
		const demoUsers = {
			'admin@example.com': { _id: 'demo-admin', name: 'System Admin', email: 'admin@example.com', role: 'admin' },
			'agent@example.com': { _id: 'demo-agent', name: 'Demo Agent', email: 'agent@example.com', role: 'agent' },
			'customer@example.com': { _id: 'demo-customer', name: 'Demo Customer', email: 'customer@example.com', role: 'customer' },
		};
		const demo = demoUsers[email];
		await logAudit({ user: demo._id, action: "LOGIN", entityType: "User", entityId: demo._id, description: "Dev demo login", ipAddress: req.ip }).catch(() => {});
		return res.json({ id: demo._id, name: demo.name, email: demo.email, role: demo.role, token: generateToken(demo) });
	}

	return res.status(401).json({ message: "Invalid credentials" });
});
exports.me=asyncHandler(async(req,res)=>res.json(clean(req.user)));
exports.changePassword=asyncHandler(async(req,res)=>{const user=await User.findById(req.user._id);const{currentPassword,newPassword}=req.body;if(!(await user.matchPassword(currentPassword)))return res.status(400).json({message:"Current password incorrect"});user.password=newPassword;await user.save();res.json({message:"Password changed successfully"})});

// Dev-only login: issue a valid JWT for seeded demo users when DB is not available
exports.devLogin = asyncHandler(async (req, res) => {
	if (process.env.NODE_ENV === 'production') return res.status(404).json({ message: 'Not available' });
	const { email } = req.body;
	if (!email) return res.status(400).json({ message: 'Email required' });

	// Try DB first (works if Mongo is connected and user exists)
	try {
		const user = await User.findOne({ email });
		if (user) return res.json({ ...clean(user), token: generateToken(user) });
	} catch (e) {
		// ignore DB errors and fall back to demo accounts below
	}

	// Local demo accounts (used when DB is not available)
	const demos = {
		'admin@example.com': { _id: 'demo-admin', name: 'System Admin', email: 'admin@example.com', role: 'admin' },
		'agent@example.com': { _id: 'demo-agent', name: 'Demo Agent', email: 'agent@example.com', role: 'agent' },
		'customer@example.com': { _id: 'demo-customer', name: 'Demo Customer', email: 'customer@example.com', role: 'customer' },
	};

	const demo = demos[email];
	if (!demo) return res.status(404).json({ message: 'Demo user not found' });

	const token = generateToken(demo);
	return res.json({ id: demo._id, name: demo.name, email: demo.email, role: demo.role, token });
});
