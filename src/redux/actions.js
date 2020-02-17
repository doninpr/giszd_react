import fetch from 'cross-fetch'
import { API_DOMAIN } from '../constants';
import {
	CHANGE_TIMELINE_YEAR,
	CHANGE_FILTERS_ON_MAP,
	MAPBOX_READY,
	RESIZE_WINDOW,
	MAPBOX_VIEWPORT_CHANGE,
  API_GET_PHOTOPOINTS,
  ADD_PHOTOPOINTS_TO_MAP,
  API_GET_PHOTOPOINTS_START,
  API_GET_PHOTOPOINTS_END,
  API_GET_MAPOBJECTS,
  ADD_MAPOBJECTS_TO_MAP,
  API_GET_MAPOBJECTS_START,
  API_GET_MAPOBJECTS_END,
  SHOW_POPUP_PHOTO,
  HIDE_POPUP_PHOTO,
  SHOW_POPUP_RAILROAD,
  HIDE_POPUP_RAILROAD,
  SHOW_POPUP_MAPOBJECT,
  HIDE_POPUP_MAPOBJECT,
  HIDE_ALL_POPUPS,
  SHOW_MODAL,
  HIDE_MODAL,
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

export const receivePhotos = (responce) => ({
  type: API_GET_PHOTOPOINTS,
  payload: {
    responce
  }
});

export const addPhotopointsToMap = () => ({
  type: ADD_PHOTOPOINTS_TO_MAP,
  payload: {}
});

export const startFetchPhotos = () => ({
  type: API_GET_PHOTOPOINTS_START,
  payload: {}
});

export const endFetchPhotos = () => ({
  type: API_GET_PHOTOPOINTS_END,
  payload: {}
});

export const receiveMapobjects = (responce) => ({
  type: API_GET_MAPOBJECTS,
  payload: {
    responce
  }
});

export const addMapobjectsToMap = () => ({
  type: ADD_MAPOBJECTS_TO_MAP,
  payload: {}
});

export const startFetchMapobjects = () => ({
  type: API_GET_MAPOBJECTS_START,
  payload: {}
});

export const endFetchMapobjects = () => ({
  type: API_GET_MAPOBJECTS_END,
  payload: {}
});

export const showPopupPhoto = ({ coords, image, description }) => ({
  type: SHOW_POPUP_PHOTO,
  payload: {
    coords,
    image,
    description
  }
});

export const hidePopupPhoto = () => ({
  type: HIDE_POPUP_PHOTO,
  payload: {}
});

export const showPopupRailroad = (params) => ({
  type: SHOW_POPUP_RAILROAD,
  payload: {
    ...params,
  }
});

export const hidePopupRailroad = () => ({
  type: HIDE_POPUP_RAILROAD,
  payload: {}
});

export const hideAllPopups = () => ({
  type: HIDE_ALL_POPUPS,
  payload: {}
});

export const showPopupMapobject = ({ coords, title, category_name, id, open_date, end_date, images }) => ({
  type: SHOW_POPUP_MAPOBJECT,
  payload: {
    coords,
    title,
    category_name,
    id,
    open_date,
    end_date,
    images
  }
});

export const hidePopupMapobject = () => ({
  type: HIDE_POPUP_MAPOBJECT,
  payload: {}
});


export const showModal = (props) => ({
  type: SHOW_MODAL,
  payload: {
    ...props
  }
});

export const hideModal = () => ({
  type: HIDE_MODAL,
  payload: {}
});



//API
export const fetchPhotos = (url = '/photo/?geodata=true') => {
  return dispatch => {
    dispatch(startFetchPhotos());
    fetch(API_DOMAIN + url)
      .then(response => response.json())
      .then(json => {
        if(!(json.next === null)){
          dispatch(fetchPhotos(json.next.split('http://2.59.42.199')[1]));
        } else {
          dispatch(endFetchPhotos());
        }
        dispatch(receivePhotos(json))
      })
  }
}

export const fetchMapobjects = (url = '/map-objects/') => {
  return dispatch => {
    dispatch(startFetchMapobjects());
    fetch(API_DOMAIN + url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveMapobjects(json));
        dispatch(endFetchMapobjects());
      })
  }
}











