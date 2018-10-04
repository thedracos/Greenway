//root reducer file
import { combineReducers } from 'redux';
import reducers from './reducers';

export default combineReducers({
  expenses: reducers
});