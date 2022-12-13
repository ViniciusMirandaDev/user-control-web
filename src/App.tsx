import { ChangeEvent, useState } from 'react';
import {
	Container,
	Header,
	Content,
	Footer,
	Form,
	ButtonToolbar,
	Button,
	Navbar,
	Panel,
	FlexboxGrid,
	Message,
} from 'rsuite';
import api from './services/api';
import jwt_decode from 'jwt-decode';
import './App.css';
import Warning from './assets/warning.png';

interface loginRequest {
	email: string;
	password: string;
}

import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	);
}

function Layout() {
	return (
		<div>
			<Header style={{ marginBottom: 50 }}>
				<Navbar appearance="inverse">
					<Navbar.Brand>
						<a
							style={{ color: '#fff' }}
							href="https://github.com/ViniciusMirandaDev"
						>
							Vinícius Miranda Baptista
						</a>
					</Navbar.Brand>
				</Navbar>
			</Header>
			<Outlet />
		</div>
	);
}

function Home() {
	const [form, setForm] = useState<loginRequest>();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//setPassword(e.target.value);
	};

	const handleSubmit = async () => {
		//setForm({ email: email, password: password });
		var request = await api.post('/Authentication/login', form);
		var json = await request.data;

		localStorage.setItem('token', json.token);
		//var ok: string = localStorage.getItem('token');

		//var oks = jwt_decode(ok);
	};

	return (
		<div className="show-fake-browser login-page">
			<Container>
				<Content>
					<FlexboxGrid justify="center">
						<FlexboxGrid.Item colspan={12}>
							<Panel header={<h3>Login</h3>} bordered>
								<Form fluid>
									<Form.Group>
										<Form.ControlLabel>Email address</Form.ControlLabel>
										<Form.Control
											value={email}
											//onChange={(e) => handleEmailChange(e)}
											name="email"
										/>
									</Form.Group>
									<Form.Group>
										<Form.ControlLabel>Password</Form.ControlLabel>
										<Form.Control
											name="password"
											type="password"
											autoComplete="off"
											value={password}
											//onChange={(e) => handlePasswordChange(e)}
										/>
									</Form.Group>
									<Form.Group>
										<ButtonToolbar>
											<Button
												appearance="primary"
												onClick={() => handleSubmit()}
											>
												Sign in
											</Button>
											<Button appearance="link">Forgot password?</Button>
										</ButtonToolbar>
									</Form.Group>
								</Form>
							</Panel>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</Content>
				<Footer style={{ textAlign: 'center', marginTop: 50 }}>
					Vinícius Miranda Baptista 2022
				</Footer>
			</Container>
		</div>
	);
}

function About() {
	return (
		<div>
			<h2>About</h2>
		</div>
	);
}

function Dashboard() {
	return (
		<div>
			<h2>Dashboard</h2>
		</div>
	);
}

function NoMatch() {
	return (
		<div className="error-div">
			<Message type="info">
				<h2>404, Unauthorized</h2>
			</Message>
			<img src={Warning} />
			<p>
				<Link to="/">Go to the home page</Link>
			</p>
		</div>
	);
}
