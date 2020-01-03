import { CHANGE_TIMELINE_YEAR, CHANGE_FILTERS_ON_MAP } from "./actionTypes";

export const setYear = currentYear => ({
  type: CHANGE_TIMELINE_YEAR,
  payload: {
  	currentYear: currentYear
  }
});

export const changeFiltersOnMap = () => ({
  type: CHANGE_FILTERS_ON_MAP,
  payload: {}
});