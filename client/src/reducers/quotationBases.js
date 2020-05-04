import _ from 'lodash';
import {
  SET_ADMIN_CATEGORY,
  SET_ADMIN_ELEMENT,
  LOAD_ADMIN_QUOTATION_BASES,
  EDIT_QUOTATION_BASE,
  CANCEL_EDIT_QUOTATION_BASE,
  UPDATE_QUOTATION_BASE,
  SAVE_QUOTATION_BASE,
  REMOVE_QUOTATION_BASE,
} from '../actions/types';

const initialState = {
  quotationBasesData: [],
  editingQuotationBase: {},
  category: null,
  element: null,
};

const emptyQuotationBase = {
  name: '',
  description: '',
  quotationbysizes: [],
  isNew: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ADMIN_CATEGORY:
      return {
        ...state,
        category: payload,
        element: null,
      };
    case SET_ADMIN_ELEMENT:
      return {
        ...state,
        element: payload,
      };
    case LOAD_ADMIN_QUOTATION_BASES:
      return {
        ...state,
        quotationBasesData: [...payload.data],
      };
    case EDIT_QUOTATION_BASE:
      return {
        ...state,
        editingQuotationBase: payload
          ? { ...payload, isNew: false }
          : {
              ...emptyQuotationBase,
              category: _.get(state.category, '_id', null),
              element: _.get(state.element, '_id', null),
            },
      };
    case CANCEL_EDIT_QUOTATION_BASE:
      return {
        ...state,
        editingQuotationBase: {},
      };
    case UPDATE_QUOTATION_BASE:
      return {
        ...state,
        editingQuotationBase: payload,
      };
    case SAVE_QUOTATION_BASE: {
      if (payload.isNew) {
        const newQuotationBase = { ...payload };
        delete newQuotationBase.isNew;
        return {
          ...state,
          quotationBasesData: state.quotationBasesData.concat([
            newQuotationBase,
          ]),
          editingQuotationBase: {},
        };
      }
      const index = _.findIndex(
        state.quotationBasesData,
        c => c._id.toString() === payload._id.toString(),
      );
      return {
        ...state,
        quotationBasesData: state.quotationBasesData
          .slice(0, index)
          .concat([payload])
          .concat(state.quotationBasesData.slice(index + 1)),
        editingQuotationBase: {},
      };
    }
    case REMOVE_QUOTATION_BASE: {
      const index = _.findIndex(
        state.quotationBasesData,
        c => c._id.toString() === payload,
      );
      const newCategoriesData = [...state.quotationBasesData];
      newCategoriesData.splice(index, 1);
      return {
        ...state,
        quotationBasesData: newCategoriesData,
      };
    }
    default:
      return state;
  }
};
