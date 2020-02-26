import {
  API_SEARCH_START,
  API_SEARCH_GET,
  HIDE_SEARCH_RESULTS
} from "../actionTypes";

const initialState = {
  isShown: false,
  stations: {
    isLoading: false,
    results: [],
  },
  railways: {
    isLoading: false,
    results: [],
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case API_SEARCH_START: {
      return {
        ...state,
        isShown: true,
        stations: {
          isLoading: true,
          results: [],
        },
        railways: {
          isLoading: true,
          results: [],
        }
      };
    }
    case API_SEARCH_GET: {
      return {
        ...state,
        stations: {
          isLoading: action.payload.stations ? false : state.stations.isLoading,
          results: action.payload.stations ? action.payload.stations : state.stations.results,
        },
        railways: {
          isLoading: action.payload.railways ? false : state.railways.isLoading,
          results: action.payload.railways ? action.payload.railways : state.railways.results,
        }
      };
    }
    case HIDE_SEARCH_RESULTS: {
      return {
        ...state,
        isShown: false,
      };
    }
    default:
      return state;
  }
}
