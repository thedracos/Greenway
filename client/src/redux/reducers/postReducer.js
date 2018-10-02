import { GET_EXPENSES, ADD_EXPENSE } from '../actions/types.js';

const initialState = {
  expenses: [],
  expense: {}
}

//evaluates what 'type' we're dealing with
export default function(state = initialState, action) {
  console.log('action.type', action.type);
  switch(action.type) {
    case ADD_EXPENSE:
    console.log('fetching from reducer: ADD_EXPENSE');
      return {
        ...state,
        expense: action.payload
      }
    case GET_EXPENSES:
    console.log(action.payload);
      return {
        ...state,
        expenses: action.payload
      }
    default: 
      return state;
  }
}