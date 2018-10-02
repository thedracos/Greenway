import { GET_EXPENSES, ADD_EXPENSE } from './types.js';

export function fetchExpenses() {
  console.log('fetching from actions');
  return function(dispatch) {
    fetch('/getExpenses')
      .then(res => res.json())
      .then(expenses => dispatch({
        type: GET_EXPENSES,
        payload: expenses
      }));
  }
}

//Fetch API is being used rather than importing Axios/jQuery. on line 6.
//When we get a response from server, the expenses data is DISPATCHED according to the 
//imported GET_EXPENSES type found in types.js.
//The DISPATCH is similar to setState({ expenses: expenses })