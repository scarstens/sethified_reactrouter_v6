import { Link, Outlet } from 'react-router-dom';

export default function App() {
	return (
		<div>
			<header>
				<h1>Bookkeeper!</h1>
				<nav
					style={{
						borderBottom: 'solid 1px',
						paddingBottom: '1rem'
					}}
				>
					<Link to="/">Home</Link> | <Link to="/invoices">Invoices</Link> |{' '}
					<Link to="/expenses">Expenses</Link>
				</nav>
			</header>
			<Outlet />
		</div>
	);
}
