import { useSearchParams } from "react-router-dom";
import Budget from "../classes/Budget";
import data from "../data/data";
import { cloneDeep } from "lodash";

const useGetParams = () => {
const [searchParams, setSearchParams] = useSearchParams();
	
	if(searchParams.toString().length > 0) {
		const newBudget = new Budget({...data});
		newBudget.webpage.checked = (searchParams.get("webpage") === "true");
		newBudget.seo_consult.checked = (searchParams.get("seo_consult")  === "true");
		newBudget.ads_campaign.checked = (searchParams.get("ads_campaign")  === "true");
		newBudget.client = searchParams.get("client") ?? "";
		newBudget.budget_name = searchParams.get("budget_name") ?? "";
		newBudget.webpage.pages_num = isNaN(parseInt(searchParams.get("pages_num"))) ? "" : parseInt(searchParams.get("pages_num"));
		newBudget.webpage.pages_langs = isNaN(parseInt(searchParams.get("pages_langs"))) ? "" : parseInt(searchParams.get("pages_langs"));
		
		return cloneDeep(newBudget);
		
	} else {
		return false;
	}
}

export default useGetParams;