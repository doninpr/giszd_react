import {
	CHANGE_TIMELINE_YEAR,
	CHANGE_FILTERS_ON_MAP,
	MAPBOX_READY,
	RESIZE_WINDOW,
	MAPBOX_VIEWPORT_CHANGE
} from "./actionTypes";

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

export const mapboxReady = () => ({
  type: MAPBOX_READY,
  payload: {}
});

export const mapboxViewportChange = (viewport) => ({
  type: MAPBOX_VIEWPORT_CHANGE,
  payload: {
    viewport
  }
});

export const changeWindowSize = (width, height) => ({
  type: RESIZE_WINDOW,
  payload: {
  	width,
  	height
  }
});