import { orderBy } from "lodash";
import { useState } from "react";
import { useEffect } from "react";

const BudgetList = ({ budgetList }) => {
	const defBudget = [...budgetList];
	const [list, setList] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		setList(() => [...budgetList]);
	}, [budgetList]);

	const sortBudget = () => {
		setList(() => orderBy(list, ["client", budget => budget.budget_name.toLowerCase()], ["asc"]));
	};

	const sortBudgetDate = () => {
		setList(() => orderBy(list, ["date"], ["desc"]));
	};

	const defaultSort = () => {
		setList(() => [...defBudget]);
	};

	const searchHandler = event => {
		setSearch(event.target.value);
		const searchResults = list.filter(item => item.budget_name.toLowerCase() === event.target.value.toLowerCase());
		searchResults.length > 0 ? setList(() => searchResults) : setList(() => budgetList);
	};

	return (
		<>
			{list.length > 0 && (
				<div>
					<span>Filters: </span>
					<input type="text" placeholder="Buscar…" onChange={searchHandler} value={search} />
					<button onClick={() => sortBudget()}>Ordena alfabeticamente</button>
					<button onClick={() => sortBudgetDate()}>Ordenar por fecha</button>
					<button onClick={() => defaultSort()}>Borrar filtros</button>
				</div>
			)}
			{search.length > 0 && list === budgetList ? (
				<p>Sin resultados</p>
			) : (
				list.map((item, index) => {
					return (
						<p key={index}>
							Cliente: <b>{item.client}</b> | Nombre del presupuesto: <b>{item.budget_name}</b> | Web: {item.webpage.checked ? "Si" : "No"} | SEO: {item.seo_consult.checked ? "Si" : "No"} | Ads: {item.ads_campaign.checked ? "Si" : "No"} | Total: <b>{item.total}€</b> | Fecha: <b>{item.date}</b>
						</p>
					);
				})
			)}
		</>
	);
};

export default BudgetList;
