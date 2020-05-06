import _ from 'lodash';

import {
  INITIALIZE_QUOTATION,
  SET_QUOTATION_SIZE,
  SET_QUOTATION_ELEMENT,
  UPDATE_QUOTATION_ELEMENT,
  SET_QUOTATION_INDEX,
  UPDATE_QUOTATION_CONTACT,
  SEND_QUOTATION,
  RESET_QUOTATION,
  UPDATE_TEMPORARY_VALUE,
} from '../actions/types';

const initialState = {
  category: 0,
  photoInfo: null,
  decorationBase: null,
  availableSizes: [],
  units: '',
  size: 0,
  elements: [],
  index: 0,
  contact: {
    name: '',
    phone: '',
    email: '',
    address: '',
    neighborhood: '',
    expectedDate: null,
    notes: '',
  },
  temporaryValues: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case INITIALIZE_QUOTATION:
      return {
        ...initialState,
        photoInfo: payload.photoInfo,
        decorationBase: payload.decorationBase,
        elements: _.map(payload.elements, e => ({
          index: e.index,
          element: e.name,
          selected: e.index !== 99 ? null : payload.photoInfo.baseid,
          required: e.required || false,
        })),
        availableSizes: payload.availableSizes,
        units: payload.units,
        category: payload.category,
      };
    case SET_QUOTATION_SIZE:
      return {
        ...state,
        size: payload.size,
        elements:
          state.elements.length && payload.element
            ? [payload.element].concat(state.elements.slice(1))
            : [],
        index: payload.element ? payload.element.index : 99,
      };
    case SET_QUOTATION_ELEMENT: {
      return {
        ...state,
        elements:
          state.elements.length && payload.value
            ? state.elements
                .slice(0, payload.index)
                .concat([
                  { ...state.elements[payload.index], selected: payload.value },
                ])
                .concat(state.elements.slice(payload.index + 1))
            : state.elements,
      };
    }
    case UPDATE_QUOTATION_ELEMENT: {
      return {
        ...state,
        elements:
          state.elements.length && payload.element
            ? payload.index !== 99
              ? state.elements
                  .slice(0, payload.index)
                  .concat([{ ...payload.element, selected: null }])
                  .concat(state.elements.slice(payload.index + 1))
              : state.elements
                  .slice(0, state.elements.length - 1)
                  .concat([
                    { ...payload.element, selected: state.photoInfo.baseid },
                  ])
            : state.elements,
        index: payload.index,
      };
    }
    case SET_QUOTATION_INDEX:
      return {
        ...state,
        index: payload,
      };
    case UPDATE_QUOTATION_CONTACT:
      return {
        ...state,
        contact: {
          ...state.contact,
          [payload.field]: payload.value,
        },
      };
    case UPDATE_TEMPORARY_VALUE:
      return {
        ...state,
        temporaryValues: {
          ...state.temporaryValues,
          [payload.field]: payload.value,
        },
      };
    case SEND_QUOTATION:
    case RESET_QUOTATION:
      return initialState;
    default:
      return state;
  }
};
