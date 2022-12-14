import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
	email: StringType()
		.isRequired('This field is required.')
		.isEmail('You must insert a valid email address'),
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

function ForgotPassword() {
	const formRef = useRef();
	const navigate = useNavigate();
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		email: '',
	});

	const handleSubmit = async () => {
		if (!formRef.current.check()) {
			console.error('Form Error');
			return;
		}
		try {
			await api.post(`/User/forgot-password?userEmail=${formValue.email}`);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'This email cannot be used!',
			}).then(() => {
				navigate('/');
			});
			throw error;
		}

		Swal.fire(
			'Good job!',
			'Look the link to recovery in your email!',
			'success'
		).then(() => {
			navigate('/');
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
										For your security,
										<br /> password have to contains UpperCaseLetter and
										LowerCaseLetter
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
										name="email"
										label="Email"
										type="email"
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

export default ForgotPassword;