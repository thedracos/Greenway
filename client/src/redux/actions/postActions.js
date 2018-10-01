import { GET_EXPENSES, ADD_EXPENSE } from './types.js';

export function fetchExpenses() {
  console.log('fetching from actions');
  return function(dispatch) {
      console.log(dispatch);
    //where the get request and post request is called 

    //fetch at endpoint
    //then get response and make it to json
    //with data, invoke dispatch
    //type describes action you want
    //Whenever you need to change/update the state of your Redux application,
    //you need to dispatch an action.
      //type: GET_EXPENSES,
      //payload: posts
  }
}