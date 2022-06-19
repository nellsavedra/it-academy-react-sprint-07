const BudgetList = ({ budget }) => {
	
	
	
	return(
		<>
		{budget.map((item, index) => {
			return <p key={index}>Cliente: <b>{item.client}</b> - Nombre del presupuesto: <b>{item.budget_name}</b> - Total: <b>{item.total}€</b> - Fecha: <b>{item.date}</b></p>
		})}
		</>
	);
}

export default BudgetList;