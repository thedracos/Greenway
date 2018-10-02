//root reducer file

import { combineReducers } from 'redux';
import postReducer from './postReducer.js';

export default combineReducers({
  expenses: postReducer
});