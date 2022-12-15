import {
	Form,
	Button,
	ButtonToolbar,
	Schema,
	Panel,
	FlexboxGrid,
	Container,
	Content,
	Footer,
} from 'rsuite';
import Swal from 'sweetalert2';
import React from 'react';
import {
	Navigate,
	redirect,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import api from '../../services/api';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
	name: StringType()
		.isRequired('This field is required.')
		.minLength(4, 'Name min is 4 characters'),
	email: StringType()
		.isEmail('Insert a valid email address')
		.isRequired('This field is required.'),
	password: StringType()
		.isRequired('This field is required.')
		.containsLowercaseLetter('Must have uppercaseLetter')
		.containsUppercaseLetter('Must have uppercaseLetter'),
	verifyPassword: StringType()
		.addRule((value, data) => {
			if (value !== data.password) {
				return false;
			}

			return true;
		}, 'The two passwords do not match')
		.isRequired('This field is required.')
		.containsLowercaseLetter('Must have uppercaseLetter')
		.containsUppercaseLetter('Must have uppercaseLetter'),
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

function Register() {
	let { token } = useParams();
	const formRef = React.useRef();
	const navigate = useNavigate();
	const [formError, setFormError] = React.useState({});
	const [formValue, setFormValue] = React.useState({
		name: '',
		email: '',
		password: '',
		verifyPassword: '',
	});

	const handleSubmit = async () => {
		if (!formRef.current.check()) {
			console.error('Form Error');
			return;
		}
		try {
			var request = await api.post(`/User`, {
				name: formValue.name,
				email: formValue.email,
				password: formValue.password,
			});
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Or this user already exists your you cannot create at this moment, sorry!',
			}).then(() => {
				navigate('/');
			});
			throw error;
		}

		Swal.fire({
			title: 'User created!',
			html: 'You will go to login page now!',
			timer: 2000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading();
			},
			willClose: () => {
				clearInterval(2000);
			},
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				localStorage.removeItem('token');
				navigate('/');
			}
		});
	};

	return (
		<div className="show-fake-browser login-page">
			<Container>
				<Content>
					<FlexboxGrid justify="center">
						<FlexboxGrid.Item align="middle">
							<Panel
								header={
									<>
										<h3>Create a new user!</h3>
										<p>Create how much users you want to create!</p>
									</>
								}
								bordered
							>
								<Form
									ref={formRef}
									onChange={setFormValue}
									onCheck={setFormError}
									formValue={formValue}
									model={model}
								>
									<TextField
										name="name"
										label="Name"
										type="text"
										autoComplete="off"
									/>
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
									<TextField
										name="verifyPassword"
										label="Verify password"
										type="password"
										autoComplete="off"
									/>

									<ButtonToolbar>
										<Button appearance="primary" onClick={handleSubmit}>
											Submit
										</Button>
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

export default Register;
