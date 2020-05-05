import Swal from 'sweetalert2';
import axios from 'axios';
import {
  INITIALIZE_QUOTATION,
  SET_QUOTATION_SIZE,
  SET_QUOTATION_ELEMENT,
  UPDATE_QUOTATION_CONTACT,
  SEND_QUOTATION,
  RESET_QUOTATION,
} from './types';

export const initializeQuotation = (photo, category) => async dispatch => {
  const res = await axios.get(`/api/category/elements/${category}`);
  dispatch({
    type: INITIALIZE_QUOTATION,
    payload: {
      photoInfo: photo,
      elements: res.data.elements,
      availableSizes: res.data.availableSizes,
    },
  });
};

export const setQuotationSize = (category, size) => async dispatch => {
  const res = await axios.get(`/api/quotationbase/${category}/${size}/0`);

  dispatch({
    type: SET_QUOTATION_SIZE,
    payload: {
      size,
      element: res.data.index !== 99 ? { ...res.data, selected: null } : null,
    },
  });
};

export const setQuotationElement = (
  category,
  size,
  index,
  value,
) => async dispatch => {
  const res = await axios.get(
    `/api/quotationbase/${category}/${size}/${index}`,
  );

  dispatch({
    type: SET_QUOTATION_ELEMENT,
    payload: {
      index,
      value,
      element: res.data.index !== 99 ? { ...res.data, selected: null } : null,
    },
  });
};

export const updateQuotationContact = (field, value) => dispatch => {
  dispatch({
    type: UPDATE_QUOTATION_CONTACT,
    field,
    value,
  });
};

export const sendQuotation = (
  photoInfo,
  decorationBase,
  size,
  elements,
  contact,
) => dispatch => {
  // TODO: Send quotation by email

  dispatch({
    type: SEND_QUOTATION,
  });
};

export const resetQuotation = () => dispatch => {
  dispatch({
    type: RESET_QUOTATION,
  });
};
