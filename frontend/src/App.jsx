import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CreateTicket from "./pages/customer/CreateTicket";
import MyTickets from "./pages/customer/MyTickets";
import AgentDashboard from "./pages/agent/AgentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TicketDetails from "./pages/TicketDetails";

const Public = ({ children }) => (
	<>
		<Navbar />
		{children}
	</>
);

function App() {
	return (
		<Routes>
			<Route path="/" element={<Public><Home /></Public>} />
			<Route path="/about" element={<Public><About /></Public>} />
			<Route path="/login" element={<Public><Login /></Public>} />
			<Route path="/register" element={<Public><Register /></Public>} />
			<Route path="/tickets/:id" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
				<Route index element={<TicketDetails />} />
			</Route>
			<Route element={<ProtectedRoute role="customer"><DashboardLayout /></ProtectedRoute>}>
				<Route path="/customer" element={<CustomerDashboard />} />
				<Route path="/customer/create-ticket" element={<CreateTicket />} />
				<Route path="/customer/tickets" element={<MyTickets />} />
			</Route>
			<Route element={<ProtectedRoute role="agent"><DashboardLayout /></ProtectedRoute>}>
				<Route path="/agent" element={<AgentDashboard />} />
				<Route path="/agent/tickets" element={<MyTickets />} />
			</Route>
			<Route element={<ProtectedRoute role="admin"><DashboardLayout /></ProtectedRoute>}>
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/admin/tickets" element={<MyTickets />} />
				<Route path="/admin/users" element={<AdminDashboard />} />
				<Route path="/admin/audit-logs" element={<AdminDashboard />} />
			</Route>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}

export default App;
