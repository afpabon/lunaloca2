import { LOAD_ADMIN_QUOTATION_BASES } from '../actions/types';

const initialState = {
  quotationBasesData: [],
  editingQuotationBase: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ADMIN_QUOTATION_BASES:
      return {
        ...state,
        quotationBasesData: [...payload],
      };
    default:
      return state;
  }
};
