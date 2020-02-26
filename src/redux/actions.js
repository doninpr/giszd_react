import fetch from 'cross-fetch';
import _ from 'lodash';
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
  SHOW_STORYTELLING,
  HIDE_STORYTELLING,
  MAPBOX_SET_FLYTO,
  MAPBOX_DO_FLYTO,
  API_GET_RAILWAY_START,
  API_GET_RAILWAY_END,
  API_GET_RAILWAY,
  RAILWAY_SELECTED,
  SET_DEFAULT_FLYTO,
  API_GET_ALBUM,
  SHOW_ALBUM,
  HIDE_ALBUM,
  API_GET_ALBUM_START,
  SELECT_RAILROAD,
  API_SEARCH_START,
  API_SEARCH_GET,
  HIDE_SEARCH_RESULTS,
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

export const setFlyTo = (props) => ({
  type: MAPBOX_SET_FLYTO,
  payload: {
    ...props,
  }
});

export const doFlyTo = () => ({
  type: MAPBOX_DO_FLYTO,
  payload: {}
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

export const showPopupPhoto = ({ id, coords, image, description }) => ({
  type: SHOW_POPUP_PHOTO,
  payload: {
    id,
    coords,
    image,
    description
  }
});

export const hidePopupPhoto = () => ({
  type: HIDE_POPUP_PHOTO,
  payload: {}
});

export const selectRailroad = (id) => ({
  type: SELECT_RAILROAD,
  payload: {
    id
  }
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

export const showStorytelling = (responce) => ({
  type: SHOW_STORYTELLING,
  payload: {
    responce
  }
});

export const hideStorytelling = () => ({
  type: HIDE_STORYTELLING,
  payload: {}
});

export const startFetchRailway = () => ({
  type: API_GET_RAILWAY_START,
  payload: {}
});

export const endFetchRailway = () => ({
  type: API_GET_RAILWAY_END,
  payload: {}
});

export const receiveRailway = (responce) => ({
  type: API_GET_RAILWAY,
  payload: {
    responce
  }
});

export const railwaySelected = () => ({
  type: RAILWAY_SELECTED,
  payload: {}
});

export const setDefaultFlyTo = (params) => ({
  type: SET_DEFAULT_FLYTO,
  payload: {
    params,
  }
});

export const receiveAlbum = (responce) => ({
  type: API_GET_ALBUM,
  payload: {
    responce,
  }
});

export const showAlbum = (album) => ({
  type: SHOW_ALBUM,
  payload: {
    album,
  }
});

export const hideAlbum = () => ({
  type: HIDE_ALBUM,
  payload: {}
});

export const startFetchAlbum = () => ({
  type: API_GET_ALBUM_START,
  payload: {}
});

export const startFetchSearch = () => ({
  type: API_SEARCH_START,
  payload: {}
});

export const getFetchSearch = ({ stations, railways }) => ({
  type: API_SEARCH_GET,
  payload: {
    stations,
    railways
  }
});

export const hideSearchResults = () => ({
  type: HIDE_SEARCH_RESULTS,
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

export const fetchRailway = (id, url = '/railway/') => {
  return dispatch => {
    dispatch(startFetchRailway());
    fetch(API_DOMAIN + url + id + "/")
      .then(response => response.json())
      .then(json => {
        dispatch(receiveRailway(json));
        dispatch(endFetchRailway());
        if(json.album.length > 0){
          _.map(json.album, (album) => {
            dispatch(fetchAlbum(album));
          });
        }
        dispatch(showStorytelling(json));
      })
  }
}

export const fetchAlbum = (id, url = '/album/') => {
  return dispatch => {
    dispatch(startFetchAlbum());
    fetch(API_DOMAIN + url + id + "/")
      .then(response => response.json())
      .then(json => {
        dispatch(receiveAlbum(json));
      })
  }
}

export const fetchAlbumAndShow = (id, url = '/album/') => {
  return dispatch => {
    dispatch(startFetchAlbum());
    fetch(API_DOMAIN + url + id + "/")
      .then(response => response.json())
      .then(json => {
        dispatch(receiveAlbum(json));
        dispatch(showAlbum(json));
      })
  }
}

export const fetchAndShowAlbumByImageId = (id, url = '/photo/') => {
  return dispatch => {
    fetch(API_DOMAIN + url + id + "/")
      .then(response => response.json())
      .then(json => {
        if(json.imagealbum.length > 0) {
          dispatch(fetchAlbumAndShow(json.imagealbum[0]));
        }
      })
  }
}
export const fetchSearch = (query, url = '/search/') => {
  return dispatch => {
    dispatch(startFetchSearch());
    fetch(API_DOMAIN + "/railway" + url + "?search=" + query)
      .then(response => response.json())
      .then(json => {
        dispatch(getFetchSearch({ railways: json.results }));
      })
    fetch(API_DOMAIN + "/station" + url + "?search=" + query)
      .then(response => response.json())
      .then(json => {
        dispatch(getFetchSearch({ stations: json.results }));
      })
  }
}











