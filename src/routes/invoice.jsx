import { useParams, useSearchParams } from 'react-router-dom';
import { getInvoice } from '../data';

export default function Invoice() {
	let params = useParams();
	let invoice = getInvoice(params.invoiceId);
	let [ searchParams ] = useSearchParams();
	let debug = JSON.parse(searchParams.get('debug'));
	return (
		<main style={{ padding: '1rem' }}>
			{debug && console.log('debug', debug)}
			{debug && console.log('invoice', invoice)}
			{debug && console.log('params', params)}
			<h2>Total Due: {invoice.amount}</h2>
			<p>
				{invoice.name}: {invoice.number}
			</p>
			<p>Due Date: {invoice.due}</p>
		</main>
	);
}
