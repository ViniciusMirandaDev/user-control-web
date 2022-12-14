import { Link } from 'react-router-dom';
import { Message, Footer } from 'rsuite';
import Warning from '../../assets/warning.png';

function NotFound() {
	return (
		<div className="error-div">
			<Message type="info">
				<h2>This page not exists or you are now allowed to access</h2>
			</Message>
			<img src={Warning} />
			<p>
				<Link to="/">Go to the login page</Link>
			</p>
			<Footer style={{ textAlign: 'center', marginTop: 50 }}>
				Vinícius Miranda Baptista 2022
			</Footer>
		</div>
	);
}

export default NotFound;
