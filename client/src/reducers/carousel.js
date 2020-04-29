import {
  GET_CAROUSEL_IMAGES,
  GET_MAIN_CAROUSEL_IMAGES,
  RESET_CURRENT_ENLARGED_IMAGE,
  SET_CURRENT_ENLARGED_IMAGE,
} from '../actions/types';

const initialState = {
  mainCarousel: [],
  currentCarousel: [],
  currentEnlargedImage: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MAIN_CAROUSEL_IMAGES:
      return {
        ...state,
        mainCarousel: [...payload],
      };
    case GET_CAROUSEL_IMAGES:
      return {
        ...state,
        currentCarousel: [...payload],
      };
    case RESET_CURRENT_ENLARGED_IMAGE:
      return {
        ...state,
        currentEnlargedImage: null,
      };
    case SET_CURRENT_ENLARGED_IMAGE: {
      return {
        ...state,
        currentEnlargedImage: action.payload,
      };
    }
    default:
      return state;
  }
};
