import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Container,
	Content,
	FlexboxGrid,
	Panel,
	Form,
	ButtonToolbar,
	Button,
	Footer,
	Schema,
} from 'rsuite';
import Swal from 'sweetalert2';
import api from '../../services/api';
import jwt_decode from 'jwt-decode';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
	password: StringType().isRequired('This field is required.'),
	email: StringType()
		.isEmail('Insert a valid email address')
		.isRequired('This field is required.'),
});

const TextField = React.forwardRef((props, ref) => {
	const { name, label, accepter, ...rest } = props;
	return (
		<Form.Group controlId={`${name}-4`} ref={ref}>
			<Form.ControlLabel>{label} </Form.ControlLabel>
			<Form.Control name={name} accepter={accepter} {...rest} />
		</Form.Group>
	);
});

function Login() {
	const formRef = useRef();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		let jwtToken = localStorage.getItem('token') || '';
		let isTokenValid = false;
		let token: any = null;
		if (jwtToken != '') {
			token = jwt_decode(jwtToken);
			isTokenValid =
				token.email != null && Date.now() >= token.exp * 1000 == false
					? true
					: false;
		}
		if (isTokenValid == true) {
			navigate('/dashboard');
		}
	}, []);

	const handleSubmit = async () => {
		if (!formRef.current.check()) {
			console.error('Form Error');
			return;
		}
		setLoading(true);
		try {
			var request = await api.post('/Authentication/login', formValue);
			var json = await request.data;
			await localStorage.setItem('token', json.token);
			Swal.fire({
				title: 'Logged!',
				html: 'You will go to dashboard page now!',
				timer: 2000,
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading();
				},
				willClose: () => {
					clearInterval(2000);
				},
			}).then(async (result) => {
				if (
					result.dismiss === Swal.DismissReason.timer &&
					(await localStorage.getItem('token')) != null
				) {
					navigate('/dashboard');
				}
			});
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'User or password incorrect!',
			});
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="show-fake-browser login-page">
			<Container>
				<Content>
					<FlexboxGrid justify="center">
						<FlexboxGrid.Item align="middle">
							<Panel header={<h3>Login</h3>} bordered>
								<Form
									ref={formRef}
									onChange={setFormValue}
									onCheck={setFormError}
									formValue={formValue}
									model={model}
								>
									<TextField
										name="email"
										label="Email"
										type="email"
										autoComplete="off"
									/>
									<TextField
										name="password"
										label="Password"
										type="password"
										autoComplete="off"
									/>
									<ButtonToolbar>
										<Button
											appearance="primary"
											onClick={handleSubmit}
											loading={loading}
										>
											Submit
										</Button>
										<Link to="/forgot-password">
											<Button appearance="link">Forgot password?</Button>
										</Link>
									</ButtonToolbar>
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

export default Login;
