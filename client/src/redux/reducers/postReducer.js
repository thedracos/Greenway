import { GET_EXPENSES, ADD_EXPENSE } from '../actions/types.js';

const initialState = {
  expenses: [],
  expense: {}
}

export default function(state = initialState, action) {
  console.log(action.type);
  switch(action.type) {
    case ADD_EXPENSE:
    console.log('fetching from reducer');
      return {
        ...state,
        items: action.payload
      }
    default: 
      return state;
  }
}