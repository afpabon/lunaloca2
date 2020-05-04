import _ from 'lodash';
import {
  LOAD_ADMIN_CATEGORIES,
  EDIT_CATEGORY,
  CANCEL_EDIT_CATEGORY,
  UPDATE_CATEGORY,
  SAVE_CATEGORY,
  REMOVE_CATEGORY,
} from '../actions/types';

const initialState = {
  categoriesData: [],
  editingCategory: {},
};

const emptyCategory = {
  isNew: true,
  publicid: 0,
  name: '',
  onmenu: false,
  units: '',
  validsizes: [],
  elements: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ADMIN_CATEGORIES:
      return {
        ...state,
        categoriesData: [...payload],
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        editingCategory: payload
          ? { ...payload, isNew: false }
          : { ...emptyCategory },
      };
    case CANCEL_EDIT_CATEGORY:
      return {
        ...state,
        editingCategory: {},
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        editingCategory: payload,
      };
    case SAVE_CATEGORY: {
      if (payload.isNew) {
        const newCategory = { ...payload };
        delete newCategory.isNew;
        return {
          ...state,
          categoriesData: state.categoriesData.concat([newCategory]),
          editingCategory: {},
        };
      }
      const index = _.findIndex(
        state.categoriesData,
        c => c._id.toString() === payload._id.toString(),
      );
      return {
        ...state,
        categoriesData: state.categoriesData
          .slice(0, index)
          .concat([payload])
          .concat(state.categoriesData.slice(index + 1)),
        editingCategory: {},
      };
    }
    case REMOVE_CATEGORY: {
      const index = _.findIndex(
        state.categoriesData,
        c => c._id.toString() === payload,
      );
      const newCategoriesData = [...state.categoriesData];
      newCategoriesData.splice(index, 1);
      return {
        ...state,
        categoriesData: newCategoriesData,
      };
    }
    default:
      return state;
  }
};
