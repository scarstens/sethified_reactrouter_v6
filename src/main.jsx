import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Expenses from '/src/routes/expenses';
import Invoices from '/src/routes/invoices';
import Invoice from '/src/routes/invoice';
import App from './App';

const rootElement = document.getElementById('root');
render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="expenses" element={<Expenses />} />
				<Route path="invoices" element={<Invoices />}>
					<Route
						index
						element={
							<main style={{ padding: '1rem' }}>
								<p>Select an invoice</p>
							</main>
						}
					/>
					<Route path=":invoiceId" element={<Invoice />} />
				</Route>
				<Route
					path="*"
					element={
						<main style={{ padding: '1rem' }}>
							<p>
								Oops! You landed on a space that has not been created yet. Try navigating using the
								links on this site to find what you were looking for.
							</p>
						</main>
					}
					status={404}
				/>
			</Route>
		</Routes>
	</BrowserRouter>,
	rootElement
);
