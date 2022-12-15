import { Link, Outlet } from 'react-router-dom';
import { Header, Navbar } from 'rsuite';

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
						<Link to="/" style={{ color: '#fff', marginLeft: 10 }}>
							Login
						</Link>
						<Link to="/register" style={{ color: '#fff', marginLeft: 10 }}>
							Register
						</Link>
					</Navbar.Brand>
				</Navbar>
			</Header>
			<Outlet />
		</div>
	);
}

export default Layout;
