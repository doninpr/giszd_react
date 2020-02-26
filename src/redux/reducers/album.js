import {
  SHOW_ALBUM,
  HIDE_ALBUM,
} from "../actionTypes";

const initialState = {
  album: null,
  isShown: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALBUM: {
      return {
        ...state,
        album: action.payload.album,
        isShown: true,
      };
    }
    case HIDE_ALBUM: {
      return {
        ...state,
        album: null,
        isShown: false,
      };
    }
    default:
      return state;
  }
}
