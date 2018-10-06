import { GET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE, VERIFY_USER } from '../actions/types';

const initialState = {
  expenses: [],
  expense: {},
  userInfo: {}
}

//evaluates what 'type' we're dealing with and updates store
export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_EXPENSE:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        expense: action.payload
      }
    case GET_EXPENSES:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        expenses: action.payload
      }
    case DELETE_EXPENSE:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        deleted: action.payload
      }
    case VERIFY_USER:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        userInfo: action.payload
      }
    default: 
      return state;
  }
}