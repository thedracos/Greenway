import moment from 'moment';
import { GET_MONTH_EXPENSES, GET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE, VERIFY_USER } from './types';

export function fetchExpenses(userId) {
  console.log('fetching all expenses from actions');
  return function(dispatch) {
    const userInfo = {
      userId: userId
    }
    fetch('/api/user/expenses', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(expenses => dispatch({
      type: GET_EXPENSES,
      payload: expenses
    }))
  }
}

export function fetchMonthExpenses(userId, startDate, endDate) {
  console.log('fetching from actions');
  return function(dispatch) {
    const currentMonthUserExpenses = {
      userId: userId,
      currentMonth: startDate,
      nextMonth: endDate
    }
    fetch('/api/user/monthExpenses', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(currentMonthUserExpenses)
    })
    .then(res => res.json())
    .then(expenses => dispatch({
      type: GET_MONTH_EXPENSES,
      payload: expenses
    }));
  }
}

export function createExpense(newExpense) {
  console.log('creating expense from actions');
  return function(dispatch) {
    fetch('/api/expenses', {
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

export function deleteExpense(expense) {
  console.log('deleting expense from actions');
  return function(dispatch) {
    fetch('/api/expenses', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(expense)
    })
    .then(expense => dispatch({
      type: DELETE_EXPENSE,
      payload: expense
    }));
  }
}

export function verifyUser(userInfo) {
  console.log('verifying user from actions');
  return function(dispatch) {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(userInfo => dispatch({
      type: VERIFY_USER,
      payload: userInfo
    }))
  }
}

//Fetch API is being used rather than importing Axios/jQuery. on line 6.
//When we get a response from server, the expenses data is DISPATCHED according to the 
//imported GET_EXPENSES type found in types.js.
//The DISPATCH is similar to setState({ expenses: expenses })