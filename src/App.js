import { useEffect, useState } from "react";
import "./App.css";
import WebPageAddons from "./components/WebPageAddons";

function App() {

	const [budget, setBudget] = useState({
		webpage: {
			checked: false,
			pages_num: 0,
			pages_langs: 0,
		},
		seo_consult: {
			checked: false,
		},
		ads_campaign: {
			checked: false,
		},
	});
	const [grandTotal, setGrandTotal] = useState(0);

	const eventHandler = event => {
		const { name, value, checked } = event.target;
		setBudget(prevBudget => ({ ...prevBudget, [name]: { ...prevBudget[name], checked: checked, price: parseInt(value) } }));
	};

	const addonsHandler = (event, parent) => {
		const { name, value, type, className } = event.target;
		if (type === "button" && className === "sum") {
			setBudget(prevBudget => ({ ...prevBudget, [parent]: { ...prevBudget[parent], [name]: prevBudget[parent][name] + 1 } }));
		} else if (type === "button" && className === "min") {
			setBudget(prevBudget => ({ ...prevBudget, [parent]: { ...prevBudget[parent], [name]: prevBudget[parent][name] <= 0 ? 0 : prevBudget[parent][name] - 1 } }));
		} else {
			setBudget(prevBudget => ({ ...prevBudget, [parent]: { ...prevBudget[parent], [name]: isNaN(parseInt(value)) ? 0 : parseInt(value) } }));
		}
	};

	useEffect(() => {
		let total = 0;
		const addons = budget.webpage.pages_num * budget.webpage.pages_langs * 30;
		for (let item in budget) {
			if (budget[item].checked === true) {
				total += budget[item].price;
			}
		}
		setGrandTotal(budget.webpage.checked ? total + addons : total);
	}, [budget]);

	return (
		<>
			<form action="">
				<p>¿Que quieres hacer?</p>
				<p>
					<input type="checkbox" name="webpage" onChange={eventHandler} value="500" defaultChecked={budget.webpage.checked} />
					Una página web (500€)
				</p>
				<WebPageAddons
					isChecked={budget.webpage.checked}
					onChangeHandler={event => {
						addonsHandler(event, "webpage");
					}}
					currValue={budget.webpage.checked ? budget.webpage : 0}
				/>
				<p>
					<input type="checkbox" name="seo_consult" onChange={eventHandler} value="300" defaultChecked={budget.seo_consult.checked} />
					Una consultoria SEO (300€)
				</p>
				<p>
					<input type="checkbox" name="ads_campaign" onChange={eventHandler} value="200" defaultChecked={budget.ads_campaign.checked} />
					Una campaña de Google Ads (200€)
				</p>
			</form>
			<p>Precio: {grandTotal} €</p>
		</>
	);
}

export default App;
