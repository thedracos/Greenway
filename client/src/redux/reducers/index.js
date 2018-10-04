//root reducer file
import { combineReducers } from 'redux';
import reducers from './reducers';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  expenses: reducers,
  routing: routerReducer
});