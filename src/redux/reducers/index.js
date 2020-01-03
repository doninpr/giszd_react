import { combineReducers } from "redux";
import timeline from "./timeline";
import mapFilters from "./mapFilters";

export default combineReducers({
	timeline,
	mapFilters,
});
