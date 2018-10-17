import moment from 'moment';
import { 
  GET_MONTH_EXPENSES, 
  GET_EXPENSES, 
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  UPDATE_EXPENSES,
  ADD_SAVINGS,
  GET_MONTH_SAVINGS, 
  GET_SAVINGS,
  EDIT_SAVINGS,
  DELETE_EXPENSE, 
  VERIFY_USER,
} from './types';

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
    .then(expenses => dispatch({
      type: ADD_EXPENSE,
      payload: expenses
    }));
  }
}

export function updateExpense(edittedExpense) {
  console.log('updating expense from actions');
  return function(dispatch) {
    fetch('/api/expenses', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(edittedExpense)
    })
    .then(res => res.json())
    .then(expense => dispatch({
      type: UPDATE_EXPENSE,
      payload: expense
    }));
  }
}

export function updateExpenses(edittedExpense) {
  console.log('updating expenses from actions');
  return function(dispatch) {
    fetch('/api/user/expenses', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(edittedExpense)
    })
    .then(res => res.json())
    .then(expenses => dispatch({
      type: UPDATE_EXPENSES,
      payload: expenses
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
    .then(res => res.json())
    .then(expenses => dispatch({
      type: DELETE_EXPENSE,
      payload: expenses
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

export function fetchSavings(userId) {
  console.log('fetching all expenses from actions');
  return function(dispatch) {
    const userInfo = {
      userId: userId
    }
    fetch('/api/savings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(savings => dispatch({
      type: GET_SAVINGS,
      payload: savings
    }))
  }
}

export function fetchMonthSavings(userId, startDate, endDate) {
  console.log('fetchMonthSavings from actions');
  return function(dispatch) {
    const currentMonthUserSavings = {
      userId: userId,
      currentMonth: startDate,
      nextMonth: endDate
    }
    fetch('/api/user/monthSavings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(currentMonthUserSavings)
    })
    .then(res => res.json())
    .then(savings => dispatch({
      type: GET_MONTH_SAVINGS,
      payload: savings
    }));
  }
}

export function createSavings(newSavings) {
  console.log('creating savings from actions');
  return function(dispatch) {
    fetch('/api/user/savings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newSavings)
    })
    .then(res => res.json())
    .then(savings => dispatch({
      type: ADD_SAVINGS,
      payload: savings
    }));
  }
}

export function editSavings(editedItem) {
  console.log('updating edit from actions');
  return function(dispatch) {
    fetch('/api/user/savings', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(editedItem)
    })
    .then(res => res.json())
    .then(savings => dispatch({
      type: ADD_SAVINGS,
      payload: savings
    }));
  }
}

// export function updateUser(userInfo) {
//   console.log('updating user from actions');
//   return function(dispatch) {
//     fetch('/api/users/update', {
//       method: 'PUT',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify(userInfo)
//     })
//     .then(res => res.json())
//     .then(userInfo => dispatch({
//       type: UPDATE_USER,
//       payload: userInfo
//     }))
//   }
// }

//Fetch API is being used rather than importing Axios/jQuery. on line 6.
//When we get a response from server, the expenses data is DISPATCHED according to the
//imported GET_EXPENSES type found in types.js.
//The DISPATCH is similar to setState({ expenses: expenses })