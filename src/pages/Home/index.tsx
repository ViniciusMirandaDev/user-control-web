import { useNavigate } from 'react-router-dom';
import { Button, Container, Content, Footer, Message } from 'rsuite';
import jwt_decode from 'jwt-decode';
import Welcome from '../../assets/welcome.jpg';

function Home() {
	const navigate = useNavigate();
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

	if (isTokenValid == false) {
		navigate('/error');
	}

	const handleLogoutButton = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<div className="show-fake-browser login-page">
			<Container>
				<Content align="middle">
					<Message type="info">
						<h2>Olá, {token.email}!</h2>
					</Message>
					<img
						style={{
							height: '25rem',
							borderRadius: 20,
							marginTop: 50,
							marginBottom: 50,
						}}
						src={Welcome}
					/>
					<div>
						<Button size="sm" appearance="primary" onClick={handleLogoutButton}>
							Logout
						</Button>
					</div>
				</Content>

				<Footer style={{ textAlign: 'center', marginTop: 50 }}>
					Vinícius Miranda Baptista 2022
				</Footer>
			</Container>
		</div>
	);
}
export default Home;
