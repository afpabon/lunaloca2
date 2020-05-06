import _ from 'lodash';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  INITIALIZE_QUOTATION,
  SET_QUOTATION_SIZE,
  SET_QUOTATION_ELEMENT,
  UPDATE_QUOTATION_ELEMENT,
  UPDATE_QUOTATION_CONTACT,
  UPDATE_TEMPORARY_VALUE,
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
      availableSizes: res.data.sizes,
      units: res.data.units,
      category,
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

  const decoration = await axios.get(
    `/api/quotationbase/${category}/${size}/99`,
  );

  dispatch({
    type: UPDATE_QUOTATION_ELEMENT,
    payload: {
      index: 99,
      element: decoration.data,
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
      index: index - 1,
      value,
    },
  });

  dispatch({
    type: UPDATE_QUOTATION_ELEMENT,
    payload: {
      index,
      element: res.data.index !== 99 ? { ...res.data, selected: null } : null,
    },
  });
};

export const updateQuotationContact = (field, value) => dispatch => {
  dispatch({
    type: UPDATE_QUOTATION_CONTACT,
    payload: {
      field,
      value,
    },
  });
};

export const updateTemporaryValue = (field, value) => dispatch => {
  dispatch({
    type: UPDATE_TEMPORARY_VALUE,
    payload: {
      field,
      value,
    },
  });
};

export const sendQuotation = (
  photoInfo,
  size,
  elements,
  contact,
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    photoInfo,
    size,
    elements,
    contact,
  };
  const res = await axios.post('/api/photos/sendquotation', body, config);

  if (res.status === 200) {
    dispatch({
      type: SEND_QUOTATION,
    });
    Swal.fire(
      '¡Muchas gracias!',
      'Tu cotización está en proceso por parte del equipo de Lunaloca, y muy pronto te contactaremos para establecer los últimos detalles de tu pedido.',
      'success',
    );
  } else {
    Swal.fire(
      '¡Ups!',
      'Discúlpanos. Hubo un problema al intentar enviar tu cotización. Por favor intenta de nuevo, o contáctanos por la sección de contactos.',
      'danger',
    );
  }
};

export const resetQuotation = () => dispatch => {
  dispatch({
    type: RESET_QUOTATION,
  });
};

export const getSelectedOption = element => {
  if (element.selected) {
    return _.find(element.options, o => o.id === element.selected);
  }
  return null;
};

export const getTotal = elements =>
  _.reduce(
    elements,
    (sum, element) => sum + _.get(getSelectedOption(element), 'price', 0),
    0,
  );

export const formatPrice = total =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(total);
