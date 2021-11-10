import { Outlet, useSearchParams, useParams, NavLink, useLocation } from 'react-router-dom';
import { getInvoices } from '../data';

// How do we move this out into a functional component?
// import { QueryNavLink } from '../components/QueryNavLink';
function QueryNavLink({ to, ...props }) {
	let location = useLocation();
	return <NavLink to={to + location.search} {...props} />;
}

export default function Invoices() {
	let invoices = getInvoices();
	let [ searchParams, setSearchParams ] = useSearchParams();

	return (
		<div style={{ display: 'flex' }}>
			<nav
				style={{
					borderRight: 'solid 1px',
					padding: '1em'
				}}
			>
				<input
					value={searchParams.get('filter') || ''}
					style={{ display: 'block', margin: '1rem 0' }}
					onChange={(event) => {
						let filter = event.target.value;
						if (filter) {
							setSearchParams({ filter });
						} else {
							setSearchParams({});
						}
					}}
				/>
				{invoices
					.filter((invoice) => {
						let filter = searchParams.get('filter');
						if (!filter) return true;
						//maybe a better way to find the active invoice?
						let params = useParams();
						let activeInvoice = invoice.number == params.invoiceId;
						if (activeInvoice) return true;

						let filtered = invoice.name.toLowerCase().startsWith(filter.toLowerCase());
						console.log('filtered', filtered, invoice.name);

						// filtered.push(activeInvoice);
						return !filter ? true : filtered || activeInvoice;
					})
					.map((invoice) => (
						<QueryNavLink
							style={({ isActive }) => {
								return {
									display: 'block',
									margin: '1rem 0',
									color: isActive ? 'green' : ''
								};
							}}
							to={`/invoices/${invoice.number}`}
							key={invoice.number}
							className={({ isActive }) => (isActive ? 'active' : 'inactive')}
						>
							{invoice.name}
						</QueryNavLink>
					))}
			</nav>
			<Outlet />
		</div>
	);
}
