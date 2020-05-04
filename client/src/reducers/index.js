import { combineReducers } from 'redux';
import auth from './auth';
import main from './main';
import categories from './categories';
import quotationBases from './quotationBases';
import carousel from './carousel';
import loadingStatus from './loadingStatus';

export default combineReducers({
  auth,
  main,
  categories,
  quotationBases,
  carousel,
  loadingStatus,
});
