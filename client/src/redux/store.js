import { createStore, applyMiddleware, compose} from 'redux';
//import middleware
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//sets up initial state of store. store is a giant object
const initialState = {};

//thunk allows our actions to return functions instead of objects
const middleware = [thunk];

const store = createStore(
  rootReducer, 
  initialState, 
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;