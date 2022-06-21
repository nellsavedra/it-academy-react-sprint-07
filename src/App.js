import { useEffect, useState } from "react";
import WebPageAddons from "./components/WebPageAddons";
import Budget from "./classes/Budget";
import data from "./data/data";
import "./App.css";
import BudgetList from "./components/BudgetList";
import { useSearchParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import useGetParams from "./helpers/useGetParams";

const localBudget = JSON.parse(localStorage.getItem("budget"));
const localList = JSON.parse(localStorage.getItem("list"));

function App() {
	const params = useGetParams();
	const [budget, setBudget] = useState(params ? new Budget({ ...params }) : localBudget ? new Budget({ ...localBudget }) : new Budget({ ...data }));
	const [grandTotal, setGrandTotal] = useState(0);
	const [budgetList, setBudgetList] = useState(localList ? [...localList] : []);
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState("");
	const isWebpageOpen = budget.webpage.checked;


	const eventCheckHandler = event => {
		const { name, checked } = event.target;
		setBudget(budget.setProp(name, checked, "checked"));
		searchParams.set(name, checked);
	};

	const eventInputHandler = event => {
		const { name, value } = event.target;
		setBudget(budget.setProp(name, value));
		searchParams.set(name, value);
	};

	const eventAddonsHandler = event => {
		const { name, value } = event.target;
		setBudget(budget.setProp("webpage", value < 1 ? "" : parseInt(value), name));
		searchParams.set(name, value < 1 ? "" : parseInt(value), name);
	};

	// To do: implement better validation
	const budgetListHandler = (event, budget_data) => {
		event.preventDefault();
		const found = budgetList.find(e => e.budget_name === budget_data.budget_name && e.client === budget_data.client);
		if(found) {
			alert("Ya existe un presupuesto con ese nombre")
			return cloneDeep(budgetList);
		}
		const date = new Date();
		budget_data.date = `${date.getFullYear()}-${date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;
		budget_data.total = grandTotal;
		budgetList.unshift(cloneDeep(budget_data));
		setBudgetList(cloneDeep(budgetList));
	};

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
		localStorage.setItem("list", JSON.stringify(budgetList));
		setSearchParams(searchParams);
	}, [budget, budgetList, isWebpageOpen, searchParams, setSearchParams]);

	return (
		<>
			<form onSubmit={event => budgetListHandler(event, budget)}>
				<p>¿Que quieres hacer?</p>
				<p>
					{" "}
					Cliente:
					<br />
					<input type="text" name="client" value={budget.client} onChange={eventInputHandler} />
				</p>
				<p>
					{" "}
					Nombre del presupuesto:
					<br />
					<input type="text" name="budget_name" value={budget.budget_name} onChange={eventInputHandler} />
				</p>
				<p>
					<input type="checkbox" name="webpage" value={budget.webpage.price} onChange={eventCheckHandler} checked={budget.webpage.checked} />
					Una página web (500€)
				</p>
				<WebPageAddons isChecked={isWebpageOpen} eventInputHandler={eventAddonsHandler} budget={isWebpageOpen ? budget : null} />
				<p>
					<input type="checkbox" name="seo_consult" value={budget.seo_consult.price} onChange={eventCheckHandler} checked={budget.seo_consult.checked} />
					Una consultoria SEO (300€)
				</p>
				<p>
					<input type="checkbox" name="ads_campaign" value={budget.ads_campaign.price} onChange={eventCheckHandler} checked={budget.ads_campaign.checked} />
					Una campaña de Google Ads (200€)
				</p>

				<button type="submit" onClick={() => setSearch("")}>
					Guardar
				</button>
			</form>
			<p>Precio: {grandTotal} €</p>
			<hr />
			<BudgetList budgetList={budgetList} searchState={[search, setSearch]} />
		</>
	);
}

export default App;
