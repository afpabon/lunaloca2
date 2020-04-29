import axios from 'axios';
import {
  GET_MAIN_CAROUSEL_IMAGES,
  GET_CAROUSEL_IMAGES,
  RESET_CURRENT_ENLARGED_IMAGE,
  SET_CURRENT_ENLARGED_IMAGE,
} from './types';

export const getMainCarouselImages = () => async dispatch => {
  const res = await axios.get('/api/photos/starred');

  dispatch({
    type: GET_MAIN_CAROUSEL_IMAGES,
    payload: res.data,
  });
};

export const getCarouselImages = category => async dispatch => {
  const res = await axios.get(`/api/photos/category/${category}`);

  dispatch({
    type: GET_CAROUSEL_IMAGES,
    payload: res.data,
  });
};

export const resetCurrentEnlargedImage = () => dispatch => {
  dispatch({
    type: RESET_CURRENT_ENLARGED_IMAGE,
  });
};

export const setCurrentEnlargedImage = image => dispatch => {
  dispatch({
    type: SET_CURRENT_ENLARGED_IMAGE,
    payload: image,
  });
};
