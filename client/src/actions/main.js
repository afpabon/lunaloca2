import axios from 'axios';
import { LOAD_CATEGORIES, LOAD_ELEMENTS } from './types';

export const loadCategories = () => async dispatch => {
  const res = await axios.get('/api/category/menu');

  dispatch({
    type: LOAD_CATEGORIES,
    payload: res.data,
  });
};

export const loadElements = category => async dispatch => {
  const res = await axios.get(`/api/category/elements/${category}`);

  dispatch({
    type: LOAD_ELEMENTS,
    payload: res.data,
  });
};
