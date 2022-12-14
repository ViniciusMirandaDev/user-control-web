import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ForgotPasswordLink from './pages/ForgotPasswordLink';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/dashboard" element={<Home />} />
				<Route
					path="/forgot-password/:token"
					element={<ForgotPasswordLink />}
				/>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}
