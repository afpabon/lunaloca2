import { LOAD_CATEGORIES, LOAD_ELEMENTS } from '../actions/types';

const initialState = {
  categories: [],
  elements: [],
  sizes: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: payload,
        elements: [],
        sizes: [],
      };
    case LOAD_ELEMENTS:
      return {
        ...state,
        elements: { ...payload.elements },
        sizes: { ...payload.sizes },
      };
    default:
      return state;
  }
};
