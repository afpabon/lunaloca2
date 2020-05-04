import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import quotationBases from './quotationBases';
import carousel from './carousel';
import loadingStatus from './loadingStatus';

export default combineReducers({
  auth,
  categories,
  quotationBases,
  carousel,
  loadingStatus,
});
