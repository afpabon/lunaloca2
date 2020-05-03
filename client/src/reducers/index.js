import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import carousel from './carousel';
import loadingStatus from './loadingStatus';

export default combineReducers({
  auth,
  carousel,
  loadingStatus,
  form: formReducer,
});
