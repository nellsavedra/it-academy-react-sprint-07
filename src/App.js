import { useEffect, useState } from "react";
import WebPageAddons from "./components/WebPageAddons";
import Budget from "./classes/Budget";
import data from "./data/data";
import "./App.css";

const localBudget = JSON.parse(localStorage.getItem("budget"));

function App() {
	// Inicializamos el estado principal de la aplicación, verificamos si existe en localStorage
	const [budget, setBudget] = useState(localBudget ? new Budget({ ...localBudget }) : new Budget({ ...data }));
	const [grandTotal, setGrandTotal] = useState(0);
	const isWebpageOpen = budget.webpage.checked;

	// Funciones handler del formulario para checkboxes
	const eventCheckHandler = event => {
		const { name, checked } = event.target;
		setBudget(budget.setProp(name, checked, "checked"));
	};

	// Funciones handler del formulario para botones y campos de texto
	const eventAddonsHandler = event => {
		const { name, value } = event.target;
		setBudget(budget.setProp("webpage", value < 1 ? "" : parseInt(value), name));
	};

	// Sumamos para obtener el total
	useEffect(() => {
		let total = 0;
		let addons = budget.webpage.pages_num * budget.webpage.pages_langs * 30;
		addons = isWebpageOpen ? (isNaN(addons) ? 0 : addons) : 0;
		for (let item in budget) {
			if (budget[item].checked === true) {
				total += budget[item].price;
			}
		}
		setGrandTotal(total + addons);
		localStorage.setItem("budget", JSON.stringify(budget));
	}, [budget, isWebpageOpen]);

	return (
		<>
			<form action="">
				<p>¿Que quieres hacer?</p>
				<p>
					<input type="checkbox" name="webpage" value={budget.webpage.price} onChange={eventCheckHandler} defaultChecked={budget.webpage.checked} />
					Una página web (500€)
				</p>
				<WebPageAddons isChecked={isWebpageOpen} eventInputHandler={eventAddonsHandler} budget={isWebpageOpen ? budget : null} />
				<p>
					<input type="checkbox" name="seo_consult" value={budget.seo_consult.price} onChange={eventCheckHandler} defaultChecked={budget.seo_consult.checked} />
					Una consultoria SEO (300€)
				</p>
				<p>
					<input type="checkbox" name="ads_campaign" value={budget.ads_campaign.price} onChange={eventCheckHandler} defaultChecked={budget.ads_campaign.checked} />
					Una campaña de Google Ads (200€)
				</p>
			</form>
			<p>Precio: {grandTotal} €</p>
		</>
	);
}

export default App;
