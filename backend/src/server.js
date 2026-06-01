require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");
const configureSocket = require("./sockets/socket");
const seedData = require("./utils/seed");
const startSlaCron = require("./utils/slaCron");
const PORT = process.env.PORT || 5000;

(async () => {
	let dbConnected = false;
	try {
		await connectDB();
		dbConnected = true;
		await seedData();
	} catch (e) {
		console.warn("Database connection failed — running in degraded mode:", e && e.message ? e.message : e);
	}

	const server = http.createServer(app);
	const io = new Server(server, {
		cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true },
	});

	app.set("io", io);
	configureSocket(io);
	startSlaCron(io);

	server.listen(PORT, () => console.log(`SupportIQ API running on port ${PORT}`));
})().catch((e) => {
	console.error(e);
	process.exit(1);
});
