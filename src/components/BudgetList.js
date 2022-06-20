import { orderBy } from "lodash";
import { useState } from "react";
import { useEffect } from "react";

const BudgetList = ({ budgetList }) => {
	
	const defBudget = [...budgetList];
	
	const [list, setList] = useState([]);

	useEffect(() => {
		setList([...budgetList]);
	}, [budgetList]);

	const sortBudget = () => {
		setList(() => orderBy(budgetList, [budget => budget.budget_name.toLowerCase()], ["asc"]));
	};
	
	const sortBudgetDate = () => {
		setList(() => orderBy(budgetList, ["date"], ["asc"]));
	}
	
	const defaultSort = () => {
		setList(() => [...defBudget]);
	}

	return (
		<>
			{list.length > 0 && (
				<div>
					<span>Filters: </span>
					<button onClick={() => sortBudget()}>Ordena alfabeticamente</button>
					<button onClick={() => sortBudgetDate()}>Ordenar por fecha</button>
					<button onClick={() => defaultSort()}>Por defecto</button>
				</div>
			)}
			{list.map((item, index) => {
				return (
					<p key={index}>
						Cliente: <b>{item.client}</b> | Nombre del presupuesto: <b>{item.budget_name}</b> | Web: {item.webpage.checked ? "Si" : "No"} | SEO: {item.seo_consult.checked ? "Si" : "No"} | Ads: {item.ads_campaign.checked ? "Si" : "No"} | Total: <b>{item.total}€</b> | Fecha: <b>{item.date}</b>
					</p>
				);
			})}
		</>
	);
};

export default BudgetList;
