import { SET_LOADING_STATUS } from './types';

export const setLoadingStatus = status => dispatch =>
  dispatch({
    type: SET_LOADING_STATUS,
    payload: status,
  });
