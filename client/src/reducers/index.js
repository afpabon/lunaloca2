import { combineReducers } from 'redux';
import carousel from './carousel';
import loadingStatus from './loadingStatus';

export default combineReducers({ carousel, loadingStatus });
