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

export function createExpense(newExpense) {
  console.log('creating expense from actions');
  return function(dispatch) {
    fetch('/addExpense', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newExpense)
    })
    .then(res => res.json())
    .then(expense => dispatch({
      type: ADD_EXPENSE,
      payload: expense
    }));
  }
}

//Fetch API is being used rather than importing Axios/jQuery. on line 6.
//When we get a response from server, the expenses data is DISPATCHED according to the 
//imported GET_EXPENSES type found in types.js.
//The DISPATCH is similar to setState({ expenses: expenses })