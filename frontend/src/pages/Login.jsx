import{useState}from"react";import{useNavigate,Link}from"react-router-dom";import{toast}from"react-toastify";import{useAuth}from"../context/AuthContext";import api from"../services/api";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: "", password: "" });

	const submit = async (e) => {
		e.preventDefault();
		try {
			const path = await login(form.email, form.password);
			toast.success("Login successful");
			navigate(path);
		} catch (err) {
			toast.error(err.response?.data?.message || "Login failed");
		}
	};

	const demoLogin = async (email) => {
		try {
			const { data } = await api.post('/auth/dev-login', { email });
			localStorage.setItem('supportiq_user', JSON.stringify(data));
			toast.success(`Logged in as ${data.name}`);
			// navigate based on role
			const dest = data.role === 'admin' ? '/admin' : data.role === 'agent' ? '/agent' : '/customer';
			navigate(dest);
		} catch (err) {
			// Fallback: set a local demo user so UI shows logged-in state even if backend unreachable
			const demoUsers = {
				'admin@example.com': { _id: 'demo-admin', name: 'System Admin', email: 'admin@example.com', role: 'admin', token: 'dev_token_admin' },
				'agent@example.com': { _id: 'demo-agent', name: 'Demo Agent', email: 'agent@example.com', role: 'agent', token: 'dev_token_agent' },
				'customer@example.com': { _id: 'demo-customer', name: 'Demo Customer', email: 'customer@example.com', role: 'customer', token: 'dev_token_customer' },
			};
			const demo = demoUsers[email];
			if (!demo) return toast.error('Demo user not found');
			localStorage.setItem('supportiq_user', JSON.stringify(demo));
			toast.success(`Logged in as ${demo.name} (offline)`);
			const dest = demo.role === 'admin' ? '/admin' : demo.role === 'agent' ? '/agent' : '/customer';
			navigate(dest);
		}
	};

	return (
		<main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
			<form onSubmit={submit} className="card w-full max-w-md p-8">
				<h1 className="text-3xl font-black">Welcome back</h1>
				<input className="input mt-6" placeholder="Email" type="email" onChange={e=>setForm({...form,email:e.target.value})} />
				<input className="input mt-4" placeholder="Password" type="password" onChange={e=>setForm({...form,password:e.target.value})} />
				<button className="btn-primary mt-6 w-full">Login</button>
				<p className="mt-5 text-center text-sm text-slate-500">No account? <Link className="font-bold text-primary" to="/register">Register</Link></p>

				<div className="mt-6 text-center">
					<p className="text-sm text-slate-500">Or try a demo account:</p>
					<div className="mt-3 flex justify-center gap-3">
						<button type="button" onClick={()=>demoLogin('admin@example.com')} className="btn-secondary">Demo Admin</button>
						<button type="button" onClick={()=>demoLogin('agent@example.com')} className="btn-secondary">Demo Agent</button>
						<button type="button" onClick={()=>demoLogin('customer@example.com')} className="btn-secondary">Demo Customer</button>
					</div>
				</div>

				<p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">Demo credentials: admin@example.com / Admin12345 · agent@example.com / Agent12345 · customer@example.com / Customer12345</p>
			</form>
		</main>
	);
};

export default Login;
