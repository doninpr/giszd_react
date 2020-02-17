import {
  API_GET_PHOTOPOINTS,
  ADD_PHOTOPOINTS_TO_MAP,
  API_GET_PHOTOPOINTS_START,
  API_GET_PHOTOPOINTS_END,
  API_GET_MAPOBJECTS,
  ADD_MAPOBJECTS_TO_MAP,
  API_GET_MAPOBJECTS_START,
  API_GET_MAPOBJECTS_END,
} from "../actionTypes";

const initialState = {
  photopoints: {
    isLoading: false,
    isFinished: false,
    isFailed: false,
    isAddedOnMap: false,
    list: [],
  },
  mapobjects: {
    isLoading: false,
    isFinished: false,
    isFailed: false,
    isAddedOnMap: false,
    list: [],
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case API_GET_PHOTOPOINTS_START: {
      return {
        ...state,
        photopoints: {
          ...state.photopoints,
          isFinished: false,
          isLoading: true,
          isFailed: false,
        },
      };
    }
    case API_GET_PHOTOPOINTS_END: {
      return {
        ...state,
        photopoints: {
          ...state.photopoints,
          isFinished: true,
          isLoading: false,
          isFailed: false,
        },
      };
    }
    case API_GET_PHOTOPOINTS: {
      return {
        ...state,
        photopoints: {
          ...state.photopoints,
          list: [
            ...state.photopoints.list,
            ...action.payload.responce.results,
          ],
        },
      };
    }
    case ADD_PHOTOPOINTS_TO_MAP: {
      return {
        ...state,
        photopoints: {
          ...state.photopoints,
          isAddedOnMap: true,
        },
      };
    }
case API_GET_MAPOBJECTS_START: {
      return {
        ...state,
        mapobjects: {
          ...state.mapobjects,
          isFinished: false,
          isLoading: true,
          isFailed: false,
        },
      };
    }
    case API_GET_MAPOBJECTS_END: {
      return {
        ...state,
        mapobjects: {
          ...state.mapobjects,
          isFinished: true,
          isLoading: false,
          isFailed: false,
        },
      };
    }
    case API_GET_MAPOBJECTS: {
      return {
        ...state,
        mapobjects: {
          ...state.mapobjects,
          list: [
            ...state.mapobjects.list,
            ...action.payload.responce,
          ],
        },
      };
    }
    case ADD_MAPOBJECTS_TO_MAP: {
      return {
        ...state,
        mapobjects: {
          ...state.mapobjects,
          isAddedOnMap: true,
        },
      };
    }
    default:
      return state;
  }
}
