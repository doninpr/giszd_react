import { 
  MAPBOX_READY, 
  RESIZE_WINDOW, 
  MAPBOX_VIEWPORT_CHANGE, 
  MAPBOX_DO_FLYTO, 
  MAPBOX_SET_FLYTO,
  SHOW_STORYTELLING,
  HIDE_STORYTELLING,
  SHOW_POPUP_RAILROAD,
  HIDE_POPUP_RAILROAD,
  HIDE_ALL_POPUPS,
  RAILWAY_SELECTED,
  SELECT_RAILROAD,
} from "../actionTypes";
import { MAPBOX } from "../../constants";

const initialState = {
  isMapboxReady: false,
  viewport: {
    ...MAPBOX.VIEWPORT,
  },
  flyTo: {
    isUpdate: false,
    center: [],
    zoom: 0,
    pitch: 0,
    bearing: 0,
  },
  selects: {
    isUpdate: false,
    selectedRailway: 0,
    selectedLocalRailway: 0,
  },
  lastViewport: {
    ...MAPBOX.VIEWPORT,
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MAPBOX_READY: {
      return {
        ...state,
        isMapboxReady: true,
      };
    }
    case RESIZE_WINDOW: {
      return {
        ...state,
        viewport: {
          ...state.viewport,
          width: action.payload.width,
          height: action.payload.height,
        }
      };
    }
    case MAPBOX_VIEWPORT_CHANGE: {
      return {
        ...state,
        viewport: {
          ...state.viewport,
          ...action.payload.viewport,
        }
      };
    }
    case MAPBOX_SET_FLYTO: {
      return {
        ...state,
        flyTo: {
          isUpdate: true,
          center: action.payload.center || { lng: state.lastViewport.longitude, lat: state.lastViewport.latitude },
          zoom: action.payload.zoom || state.lastViewport.zoom,
          pitch: action.payload.pitch !== undefined ? action.payload.pitch : state.lastViewport.pitch || 0,
          bearing: action.payload.bearing !== undefined ? action.payload.bearing : state.lastViewport.bearing || 0,
        }
      };
    }
    case MAPBOX_DO_FLYTO: {
      return {
        ...state,
        flyTo: {
          ...state.flyTo,
          isUpdate: false,
        }
      };
    }
    case SHOW_STORYTELLING: {
      return {
        ...state,
        lastViewport: {
          ...state.viewport,
        }
      }
    }
    case HIDE_STORYTELLING: {
      return {
        ...state,
        flyTo: {
          isUpdate: true,
          center: [ state.lastViewport.longitude, state.lastViewport.latitude ],
          zoom: state.lastViewport.zoom,
          pitch: state.lastViewport.pitch,
          bearing: state.lastViewport.bearing,
        }
      }
    }
    case RAILWAY_SELECTED: {
      return {
        ...state,
        selects: {
          ...state.selects,
          isUpdate: false,
        },
      }
    }
    case SELECT_RAILROAD: {
      return {
        ...state,
        selects: {
          ...state.selects,
          isUpdate: true,
          selectedRailway: action.payload.id,
          selectedLocalRailway: 0,
        },
      }
    }
    case SHOW_POPUP_RAILROAD: {
      return {
        ...state,
        selects: {
          ...state.selects,
          isUpdate: true,
          selectedRailway: action.payload.railway_id,
          selectedLocalRailway: action.payload.id,
        },
      }
    }
    case HIDE_ALL_POPUPS:
    case HIDE_POPUP_RAILROAD: {
      return {
        ...state,
        selects: {
          ...state.selects,
          isUpdate: true,
          selectedRailway: 0,
          selectedLocalRailway: 0,
        },
      }
    }
    default:
      return state;
  }
}
