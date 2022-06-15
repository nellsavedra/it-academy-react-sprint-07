class Budget {
	constructor({ webpage, seo_consult, ads_campaign }) {
		this.webpage = webpage;
		this.seo_consult = seo_consult;
		this.ads_campaign = ads_campaign;
	}

	newBudget(data) {
		const budget = new Budget({ ...data });
		return budget;
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
