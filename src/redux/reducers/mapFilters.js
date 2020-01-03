import { CHANGE_TIMELINE_YEAR, CHANGE_FILTERS_ON_MAP } from "../actionTypes";

const initialState = {
  isFiltersChanged: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TIMELINE_YEAR: {
      return {
        ...state,
        isFiltersChanged: true,
      };
    }
    case CHANGE_FILTERS_ON_MAP: {
      return {
        ...state,
        isFiltersChanged: false,
      };
    }
    default:
      return state;
  }
}
