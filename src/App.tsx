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
} from 'rsuite';
import api from './services/api';
import jwt_decode from 'jwt-decode';

interface loginRequest {
	email: string;
	password: string;
}

const App = () => {
	const [form, setForm] = useState<loginRequest>();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e);
	};

	const handleSubmit = async () => {
		setForm({ email: email, password: password });
		var request = await api.post('/Authentication/login', form);
		var json = await request.data;

		localStorage.setItem('token', json.token);
		var ok: string = localStorage.getItem('token') || '';

		var oks = jwt_decode(ok);
		console.log(
			new Date(oks.exp).getMilliseconds(),
			new Date().getMilliseconds()
		);

		if (new Date(oks.exp).valueOf < new Date().getTime().valueOf) {
			console.log('venceu');
		} else {
			console.log('ta em dia fi');
		}
	};

	return (
		<div className="show-fake-browser login-page">
			<Container>
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
				<Content>
					<FlexboxGrid justify="center">
						<FlexboxGrid.Item colspan={12}>
							<Panel header={<h3>Login</h3>} bordered>
								<Form fluid>
									<Form.Group>
										<Form.ControlLabel>Email address</Form.ControlLabel>
										<Form.Control
											value={email}
											onChange={(e) => handleEmailChange(e)}
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
											onChange={(e) => handlePasswordChange(e)}
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
};

export default App;
