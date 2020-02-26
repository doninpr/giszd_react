import { CHANGE_TIMELINE_YEAR, SHOW_STORYTELLING, HIDE_STORYTELLING } from "../actionTypes";
import { TIMELINE } from "../../constants";

const initialState = {
  currentYear: TIMELINE.start[0],
  lastYear: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TIMELINE_YEAR: {
      const { currentYear } = action.payload;
      return {
        ...state,
        currentYear
      };
    }
    case SHOW_STORYTELLING: {
      return {
        ...state,
        lastYear: state.currentYear,
      };
    }
    case HIDE_STORYTELLING: {
      return {
        ...state,
        lastYear: null,
      };
    }
    default:
      return state;
  }
}
