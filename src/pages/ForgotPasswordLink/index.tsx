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
	password: StringType()
		.isRequired('This field is required.')
		.containsLowercaseLetter('Must have uppercaseLetter')
		.containsUppercaseLetter('Must have uppercaseLetter'),
	verifyPassword: StringType()
		.addRule((value, data) => {
			console.log(data);

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

function ForgotPasswordLink() {
	let { token } = useParams();
	const formRef = React.useRef();
	const navigate = useNavigate();
	const [formError, setFormError] = React.useState({});
	const [formValue, setFormValue] = React.useState({
		password: '',
		verifyPassword: '',
	});

	const handleSubmit = async () => {
		if (!formRef.current.check()) {
			console.error('Form Error');
			return;
		}
		try {
			var request = await api.post(
				`/User/${token}?newPassword=${formValue.password}`
			);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'This token already be used, we are going to redirect you to login!',
			}).then(() => {
				navigate('/');
			});
			throw error;
		}

		Swal.fire({
			title: 'Password changed!',
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
									<h3>
										For your security, password have to contains UpperCaseLetter
										and LowerCaseLetter
									</h3>
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

export default ForgotPasswordLink;
