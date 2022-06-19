class Budget {
	constructor({ webpage, seo_consult, ads_campaign, client, budget_name, date}) {
		this.webpage = webpage;
		this.seo_consult = seo_consult;
		this.ads_campaign = ads_campaign;
		this.client = client;
		this.budget_name = budget_name;
		this.date = date;
	}

	newBudget(data) {
		return new Budget({ ...data });
	}

	setProp(prop, value, deepProp) {
		if (deepProp) {
			this[prop][deepProp] = value;
			return this.newBudget(this);
		} else {
			this[prop] = value;
			return this.newBudget(this);
		}
	}
}

export default Budget;
