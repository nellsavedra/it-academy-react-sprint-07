import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [budget, setBudget] = useState({
		webpage:{
			checked: false,
			pages_num: 0,
			pages_langs: 0,
		},
		seo_consult:{
			checked: false,
		},
		ads_campaign:{
			checked: false,
		}
	});
	const [grandTotal, setGrandTotal] = useState(0);

	const eventHandler = event => {
		const { name, value, checked } = event.target;
		setBudget(prevBudget => ({ ...prevBudget, [name]: {...prevBudget[name], checked: checked, price: parseInt(value) } }));
	};
	
	const addonsHandler = (event, parent) => {
		const {name, value} = event.target;
		setBudget(prevBudget => ({...prevBudget, [parent]: {...prevBudget[parent], [name]: parseInt(value)}}))
	}

	useEffect(() => {
		let total = 0;
		const addons = (budget.webpage.pages_num * budget.webpage.pages_langs) * 30;
		for (let item in budget) {
			if (budget[item].checked === true) {
				total += budget[item].price;
			}
		}
		setGrandTotal(budget.webpage.checked ? total + addons : total);
	}, [budget]);

	const WebPageAddons = ({ isChecked, parent }) => {
		return (
			isChecked && <div>
				<p>
					Número de páginas <input type="number" name="pages_num" onChange={event => {addonsHandler(event, parent)}} placeholder="0" min="0" value={isChecked ? budget.webpage.pages_num : 0} />
				</p>
				<p>
					Número de idiomas <input type="number" name="pages_langs" onChange={event => {addonsHandler(event, parent)}} placeholder="0" min="0" value={isChecked ? budget.webpage.pages_langs : 0} />
				</p>
			</div>
		);
	};

	return (
		<>
			<form action="">
				<p>¿Que quieres hacer?</p>
				<p>
					<input type="checkbox" name="webpage" onChange={eventHandler} value="500" />
					Una página web (500€)
				</p>
				<WebPageAddons isChecked={budget.webpage.checked} parent={"webpage"} />
				<p>
					<input type="checkbox" name="seo_consult" onChange={eventHandler} value="300" />
					Una consultoria SEO (300€)
				</p>
				<p>
					<input type="checkbox" name="ads_campaign" onChange={eventHandler} value="200" />
					Una campaña de Google Ads (200€)
				</p>
			</form>
			<p>Preu: {grandTotal} €</p>
		</>
	);
}

export default App;
