import _ from 'lodash';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  LOAD_ADMIN_CATEGORIES,
  EDIT_CATEGORY,
  CANCEL_EDIT_CATEGORY,
  UPDATE_CATEGORY,
  SAVE_CATEGORY,
  SET_REMOVING_CATEGORY,
  REMOVE_CATEGORY,
} from './types';

const transformSizes = sizes => _.map(sizes, s => parseInt(s));

const transformElements = elements =>
  _.map(elements, e => {
    if (e.isNew) {
      return {
        index: e.index,
        name: e.name,
      };
    }
    return {
      _id: e._id,
      index: e.index,
      name: e.name,
    };
  });

const transformCategory = category => ({
  publicid: category.publicid,
  name: category.name,
  onmenu: category.onmenu,
  units: category.units,
  validsizes: transformSizes(category.validsizes),
  elements: transformElements(category.elements),
});

export const loadAdminCategories = () => async dispatch => {
  const res = await axios.get('/api/category');

  dispatch({
    type: LOAD_ADMIN_CATEGORIES,
    payload: res.data,
  });
};

export const editCategory = category => dispatch => {
  dispatch({
    type: EDIT_CATEGORY,
    payload: category,
  });
};

export const cancelEditCategory = () => dispatch => {
  dispatch({
    type: CANCEL_EDIT_CATEGORY,
  });
};

export const updateCategory = category => dispatch => {
  dispatch({
    type: UPDATE_CATEGORY,
    payload: category,
  });
};

export const saveCategory = category => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = transformCategory(category);

  let res = { status: 500 };
  if (category.isNew) {
    res = await axios.post('/api/category', body, config);
  } else {
    res = await axios.put(
      `/api/category/${category._id.toString()}`,
      body,
      config,
    );
  }

  if (res.status === 200) {
    dispatch({
      type: SAVE_CATEGORY,
      payload: { ...res.data, isNew: category.isNew },
    });
    Swal.fire('Éxito', 'Categoría actualizada con éxito', 'success');
  } else {
    Swal.fire(
      'Error',
      'Ocurrió un error al intentar actualizar la categoría',
      'danger',
    );
  }
};

export const setRemovingCategory = status => dispatch => {
  dispatch({
    type: SET_REMOVING_CATEGORY,
    payload: status,
  });
};

export const removeCategory = category => async dispatch => {
  const res = await axios.delete(`/api/category/${category}`);
  if (res.status === 200) {
    dispatch({
      type: REMOVE_CATEGORY,
      payload: category,
    });
    Swal.fire('Éxito', 'Categoría eliminada con éxito', 'success');
  } else {
    Swal.fire(
      'Error',
      'Ocurrió un error al intentar eliminar la categoría',
      'danger',
    );
  }
};
