import {
  GET_CAROUSEL_IMAGES,
  GET_MAIN_CAROUSEL_IMAGES,
  RESET_CURRENT_ENLARGED_IMAGE,
  SET_CURRENT_ENLARGED_IMAGE,
  TRIGGER_EDIT_IMAGE,
  CANCEL_IMAGE_EDITING,
  SAVE_IMAGE,
  UPDATE_IMAGE,
  UPDATE_IMAGE_DATA,
  REMOVE_IMAGE,
  SET_REMOVING_IMAGE,
} from '../actions/types';

const initialState = {
  mainCarousel: [],
  currentCarousel: [],
  currentEnlargedImage: null,
  editingImage: null,
  editingImageData: null,
  removingImage: false,
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
    case SET_CURRENT_ENLARGED_IMAGE:
      return {
        ...state,
        currentEnlargedImage: action.payload,
      };
    case TRIGGER_EDIT_IMAGE:
      return {
        ...state,
        editingImageData: action.payload,
      };
    case CANCEL_IMAGE_EDITING:
      return {
        ...state,
        editingImage: null,
        editingImageData: null,
        currentEnlargedImage: null,
      };
    case UPDATE_IMAGE:
      return {
        ...state,
        editingImage: action.payload,
      };
    case UPDATE_IMAGE_DATA:
      return {
        ...state,
        editingImageData: action.payload,
      };
    case SAVE_IMAGE: {
      let newCurrentCarousel = [];
      if (action.payload.isNew) {
        newCurrentCarousel = state.currentCarousel.concat([action.payload]);
      } else {
        const itemIndex = state.currentCarousel
          .map(image => image._id)
          .indexOf(action.payload.id);
        newCurrentCarousel = state.currentCarousel
          .slice(0, itemIndex)
          .concat([action.payload])
          .concat(state.currentCarousel.slice(itemIndex + 1));
      }
      let newMainCarousel = [...state.mainCarousel];
      if (action.payload.starred) {
        const mainIndex = state.mainCarousel
          .map(image => image._id)
          .indexOf(action.payload.id);
        if (mainIndex < 0) {
          newMainCarousel.push(action.payload);
        } else {
          newMainCarousel = newMainCarousel
            .slice(0, mainIndex)
            .concat([action.payload])
            .concat(newMainCarousel.slice(mainIndex + 1));
        }
      }
      return {
        ...state,
        currentCarousel: newCurrentCarousel,
        mainCarousel: newMainCarousel,
        editingImage: null,
        editingImageData: null,
        currentEnlargedImage: null,
      };
    }
    case SET_REMOVING_IMAGE: {
      return {
        ...state,
        removingImage: action.payload,
      };
    }
    case REMOVE_IMAGE: {
      const newCurrentCarousel = [...state.currentCarousel];
      const itemIndex = state.currentCarousel
        .map(image => image._id)
        .indexOf(action.payload);
      newCurrentCarousel.splice(itemIndex, 1);
      const newMainCarousel = [...state.mainCarousel];
      const mainIndex = state.mainCarousel
        .map(image => image._id)
        .indexOf(action.payload);
      if (mainIndex >= 0) {
        newMainCarousel.splice(mainIndex, 1);
      }
      return {
        ...state,
        currentCarousel: newCurrentCarousel,
        mainCarousel: newMainCarousel,
        currentEnlargedImage: null,
        editingImage: null,
        editingImageData: null,
        removingImage: false,
      };
    }
    default:
      return state;
  }
};
