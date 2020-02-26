import { combineReducers } from "redux";
import timeline from "./timeline";
import mapFilters from "./mapFilters";
import mapbox from "./mapbox";
import window from "./window";
import mapData from "./mapData";
import popups from "./popups";
import modal from "./modal";
import storytelling from "./storytelling";
import album from "./album";
import search from "./search";


export default combineReducers({
	timeline,
	mapFilters,
	mapbox,
	window,
	mapData,
	popups,
	modal,
	storytelling,
	album,
	search,
});
