import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [budget, setBudget] = useState({});
	const [grandTotal, setGrandTotal] = useState(0);

	const eventHandler = event => {
		const { name, value, checked } = event.target;
		setBudget(prevBudget => ({ ...prevBudget, [name]: { checked: checked, price: parseInt(value) } }));
	};

	useEffect(() => {
		let total = 0;
		for (let item in budget) {
			if (budget[item].checked === true) {
				total += budget[item].price;
			}
		}
		setGrandTotal(total);
	}, [budget]);

	return (
		<>
			<form action="">
				<p>¿Que quieres hacer?</p>
				<p>
					<input type="checkbox" name="webpage" onChange={eventHandler} value="500" />
					Una página web (500€)
				</p>
				<p>
					<input type="checkbox" name="seo_consult" onChange={eventHandler} value="300" />
					Una consultoria SEO (300€)
				</p>
				<p>
					<input type="checkbox" name="ads_campaign" onChange={eventHandler} value="200" />
					Una campaña de Google Ads (200€)
				</p>
			</form>
			<p>Preu: {grandTotal}€</p>
		</>
	);
}

export default App;
