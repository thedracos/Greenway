import { GET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE } from '../actions/types';

const initialState = {
  expenses: [],
  expense: {}
}

//evaluates what 'type' we're dealing with
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
    default: 
      return state;
  }
}