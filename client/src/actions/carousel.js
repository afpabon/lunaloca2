import Swal from 'sweetalert2';
import axios from 'axios';
import {
  GET_MAIN_CAROUSEL_IMAGES,
  GET_CAROUSEL_IMAGES,
  RESET_CURRENT_ENLARGED_IMAGE,
  SET_CURRENT_ENLARGED_IMAGE,
  LOAD_DECORATION_QUOTATION_BASES,
  TRIGGER_EDIT_IMAGE,
  CANCEL_IMAGE_EDITING,
  UPDATE_IMAGE,
  UPDATE_IMAGE_DATA,
  SAVE_IMAGE,
  SET_REMOVING_IMAGE,
  REMOVE_IMAGE,
} from './types';

export const loadDecorationQuotationBases = categories => async dispatch => {
  const res = await axios.get(
    `/api/photos/quotationBases/${categories.join(',')}`,
  );

  dispatch({
    type: LOAD_DECORATION_QUOTATION_BASES,
    payload: res.data,
  });
};

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

export const triggerEditImage = (image, category) => async dispatch => {
  if (!image) {
    dispatch({
      type: TRIGGER_EDIT_IMAGE,
      payload: { isNew: true, categories: [category || 1] },
    });
  } else {
    dispatch({
      type: TRIGGER_EDIT_IMAGE,
      payload: { isNew: false },
    });
    const photo = await axios.get(`/api/photos/${image}`);
    if (photo.status === 200) {
      dispatch({
        type: TRIGGER_EDIT_IMAGE,
        payload: photo.data,
      });
    }
  }
};

export const cancelImageEditing = () => dispatch => {
  dispatch({
    type: CANCEL_IMAGE_EDITING,
  });
};

export const updateImage = image => dispatch => {
  dispatch({
    type: UPDATE_IMAGE,
    payload: image,
  });
};

export const updateImageData = data => dispatch => {
  dispatch({
    type: UPDATE_IMAGE_DATA,
    payload: data,
  });
};

export const saveImage = (image, file) => async dispatch => {
  const formData = new FormData();

  if (image.isNew) {
    formData.append('file', file[0]);
  }

  image.tags =
    (image.tags &&
      image.tags.map(t => {
        if (typeof t !== 'string') return t.label;
        return t;
      })) ||
    [];

  Object.keys(image).forEach(key => {
    formData.append(key, image[key]);
  });

  const config = image.isNew
    ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    : {
        headers: {
          'Content-Type': 'application/json',
        },
      };

  const res = image.isNew
    ? await axios.post('/api/photos', formData, config)
    : await axios.put('/api/photos', JSON.stringify(image), config);
  if (res.status === 200) {
    dispatch({
      type: SAVE_IMAGE,
      payload: { ...res.data, isNew: image.isNew },
    });
    Swal.fire('Éxito', 'Imagen actualizada con éxito', 'success');
  } else {
    Swal.fire(
      'Error',
      'Ocurrió un error al intentar actualizar la imagen',
      'danger',
    );
  }
};

export const setRemovingImage = status => dispatch => {
  dispatch({
    type: SET_REMOVING_IMAGE,
    payload: status,
  });
};

export const deleteImage = image => async dispatch => {
  const res = await axios.delete(`/api/photos/${image}`);
  if (res.status === 200) {
    dispatch({
      type: REMOVE_IMAGE,
      payload: image,
    });
    Swal.fire('Éxito', 'Imagen eliminada con éxito', 'success');
  } else {
    Swal.fire(
      'Error',
      'Ocurrió un error al intentar eliminar la imagen',
      'danger',
    );
  }
};
