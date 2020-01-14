import { combineReducers } from "redux";
import timeline from "./timeline";
import mapFilters from "./mapFilters";
import mapbox from "./mapbox";
import window from "./window";


export default combineReducers({
	timeline,
	mapFilters,
	mapbox,
	window,
});
