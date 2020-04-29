import { SET_LOADING_STATUS } from '../actions/types';

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
