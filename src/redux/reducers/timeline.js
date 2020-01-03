import { CHANGE_TIMELINE_YEAR } from "../actionTypes";
import { TIMELINE } from "../../constants";

const initialState = {
  currentYear: TIMELINE.start[0],
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
    default:
      return state;
  }
}
