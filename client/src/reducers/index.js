import { combineReducers } from 'redux';
import auth from './auth';
import carousel from './carousel';
import loadingStatus from './loadingStatus';

export default combineReducers({ auth, carousel, loadingStatus });
