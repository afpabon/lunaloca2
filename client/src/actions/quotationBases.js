import Swal from 'sweetalert2';
import axios from 'axios';
import {
  SET_ADMIN_CATEGORY,
  SET_ADMIN_ELEMENT,
  LOAD_ADMIN_QUOTATION_BASES,
  EDIT_QUOTATION_BASE,
  CANCEL_EDIT_QUOTATION_BASE,
  UPDATE_QUOTATION_BASE,
  SAVE_QUOTATION_BASE,
  SET_REMOVING_QUOTATION_BASE,
  REMOVE_QUOTATION_BASE,
} from './types';

export const setAdminCategory = category => dispatch => {
  dispatch({
    type: SET_ADMIN_CATEGORY,
    payload: category,
  });
};

export const setAdminElement = element => dispatch => {
  dispatch({
    type: SET_ADMIN_ELEMENT,
    payload: element,
  });
};

export const loadAdminQuotationBases = (
  category,
  element,
) => async dispatch => {
  const res = await axios.get(`/api/quotationbase/${category}/${element}`);

  dispatch({
    type: LOAD_ADMIN_QUOTATION_BASES,
    payload: {
      data: res.data,
      category,
      element,
    },
  });
};

export const editQuotationBase = quotationBase => dispatch => {
  dispatch({
    type: EDIT_QUOTATION_BASE,
    payload: quotationBase,
  });
};

export const cancelEditQuotationBase = () => dispatch => {
  dispatch({
    type: CANCEL_EDIT_QUOTATION_BASE,
  });
};

export const updateQuotationBase = quotationBase => dispatch => {
  dispatch({
    type: UPDATE_QUOTATION_BASE,
    payload: quotationBase,
  });
};

export const saveQuotationBase = quotationBase => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(quotationBase);

  let res = { status: 500 };
  if (quotationBase.isNew) {
    res = await axios.post('/api/quotationBase', body, config);
  } else {
    res = await axios.put(
      `/api/quotationbase/${quotationBase._id.toString()}`,
      body,
      config,
    );
  }

  if (res.status === 200) {
    dispatch({
      type: SAVE_QUOTATION_BASE,
      payload: { ...res.data, isNew: quotationBase.isNew },
    });
    Swal.fire('Éxito', 'Base de cotización actualizada con éxito', 'success');
  } else {
    Swal.fire(
      'Error',
      'Ocurrió un error al intentar actualizar la base de cotización',
      'danger',
    );
  }
};

export const setRemovingQuotationBase = status => dispatch => {
  dispatch({
    type: SET_REMOVING_QUOTATION_BASE,
    payload: status,
  });
};

export const removeQuotationBase = quotationBase => async dispatch => {
  const res = await axios.delete(`/api/quotationbase/${quotationBase}`);
  if (res.status === 200) {
    dispatch({
      type: REMOVE_QUOTATION_BASE,
      payload: quotationBase,
    });
    Swal.fire('Éxito', 'Base de cotización eliminada con éxito', 'success');
  } else {
    Swal.fire(
      'Error',
      'Ocurrió un error al intentar eliminar la base de cotización',
      'danger',
    );
  }
};
