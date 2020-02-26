import { 
  SHOW_STORYTELLING,
  HIDE_STORYTELLING,
  API_GET_RAILWAY_START,
  API_GET_RAILWAY_END,
  API_GET_RAILWAY,
  SET_DEFAULT_FLYTO,
  API_GET_ALBUM,
  API_GET_ALBUM_START,
} from "../actionTypes";

const initialState = {
  isShown: false,
  isLoading: false,
  isFailure: false,
  isFinished: false,
  railwayToShow: null,
  defaultFlyTo: null,
  railways: [],
  albums: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_STORYTELLING: {
      return {
        ...state,
        isShown: true,
        railwayToShow: action.payload.responce,
      };
    }
    case HIDE_STORYTELLING: {
      return {
        ...state,
        isShown: false,
        railwayToShow: null,
        defaultFlyTo: null,
        albums: [],
      };
    }
    case API_GET_RAILWAY_START: {
      return {
        ...state,
        isLoading: true,
        isFinished: false,
      };
    }
    case API_GET_RAILWAY_END: {
      return {
        ...state,
        isLoading: false,
        isFinished: true,
      };
    }
    case API_GET_RAILWAY: {
      return {
        ...state,
        railways: [
          ...state.railways,
          action.payload.responce,
        ],
      };
    }
    case SET_DEFAULT_FLYTO: {
      return {
        ...state,
        defaultFlyTo: {
          ...action.payload.params,
        }
      };
    }

    case API_GET_ALBUM_START: {
      return {
        ...state,
        albums: [],
      };
    }
    case API_GET_ALBUM: {
      return {
        ...state,
        albums: [
          ...state.albums,
          {
            ...action.payload.responce,
          }
        ]
      };
    }
    default:
      return state;
  }
}
