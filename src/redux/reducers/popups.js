import {
  SHOW_POPUP_PHOTO,
  HIDE_POPUP_PHOTO,
  SHOW_POPUP_MAPOBJECT,
  HIDE_POPUP_MAPOBJECT,
  HIDE_ALL_POPUPS,
  SHOW_POPUP_RAILROAD,
  HIDE_POPUP_RAILROAD,
} from "../actionTypes";

const initialState = {
  photo: {
    isShow: false,
    id: null,
    image: '',
    description: '',
    coords: [],
  },
  mapobject: {
    isShow: false,
    coords: [],
    title: '',
    category_name: '',
    id: null,
    open_date: null,
    end_date: null,
    images: [],
  },
  railroad: {
    isShow: false,
    coords: [],
    title: '',
    id: null,
    open_date: null,
    end_date: null,
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_POPUP_PHOTO: {
      return {
        ...state,
        photo: {
          ...state.photo,
          isShow: true,
          id: action.payload.id,
          image: action.payload.image,
          description: action.payload.description,
          coords: action.payload.coords,
        },
      };
    }
    case HIDE_POPUP_PHOTO: {
      return {
        ...state,
        photo: {
          ...state.photo,
          isShow: false,
          id: null,
          image: '',
          description: '',
          coords: [],
        },
      };
    }
    case SHOW_POPUP_RAILROAD: {
      return {
        ...state,
        railroad: {
          ...state.railroad,
          isShow: true,
          ...action.payload,
        },
      };
    }
    case HIDE_POPUP_RAILROAD: {
      return {
        ...state,
        railroad: {
          ...state.railroad,
          ...initialState.railroad,
        },
      };
    }
    case SHOW_POPUP_MAPOBJECT: {
      return {
        ...state,
        mapobject: {
          ...state.mapobject,
          isShow: true,
          coords: action.payload.coords,
          title: action.payload.title,
          category_name: action.payload.category_name,
          id: action.payload.id,
          open_date: action.payload.open_date,
          end_date: action.payload.end_date,
          images: action.payload.images,
        },
      };
    }
    case HIDE_POPUP_MAPOBJECT: {
      return {
        ...state,
        mapobject: {
          ...state.mapobject,
          isShow: false,
          coords: [],
          title: '',
          category_name: '',
          id: null,
          open_date: null,
          end_date: null,
          coords: [],
          images: [],
        },
      };
    }
    case HIDE_ALL_POPUPS: {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return state;
  }
}
