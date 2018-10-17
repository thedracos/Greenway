import { 
  GET_MONTH_EXPENSES, 
  GET_EXPENSES, 
  ADD_EXPENSE, 
  UPDATE_EXPENSE,
  UPDATE_EXPENSES,
  ADD_SAVINGS, 
  GET_SAVINGS,
  GET_MONTH_SAVINGS,
  EDIT_SAVINGS,
  DELETE_EXPENSE, 
  VERIFY_USER,
} from '../actions/types';

const initialState = {
  expenses: [],
  monthExpenses: [],
  // expense: {},
  updated: {},
  userInfo: {},
  savingsItem: {},
  savings: [],
  monthSavings: []
}

//evaluates what 'type' we're dealing with and updates store
export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_EXPENSE:
    console.log('this is action.payload', action.payload);
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        monthExpenses: action.payload
      }
    case GET_EXPENSES:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        expenses: action.payload
      }
    case GET_MONTH_EXPENSES:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        monthExpenses: action.payload
      }
    case UPDATE_EXPENSE:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        monthExpenses: action.payload
      }
    case UPDATE_EXPENSES:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        updated: action.payload
      }
    case DELETE_EXPENSE:
    console.log('PAYLOAD AFTER DELETE', action.payload);
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        monthExpenses: action.payload
      }
    case VERIFY_USER:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        userInfo: action.payload
      }
    case GET_SAVINGS:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        savings: action.payload
      }
    case GET_MONTH_SAVINGS:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        monthSavings: action.payload
      }
    case ADD_SAVINGS:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        monthSavings: action.payload
      }
    case EDIT_SAVINGS:
    console.log(`${action.type}: updating store by reducer`);
      return {
        ...state,
        savingsItem: action.payload
      }
    // case UPDATE_USER:
    // console.log(`${action.type}: updating store by reducer`);
    //   return {
    //     ...state,
    //     userInfo: action.payload
    //     // object containing id, income
    //     // maybe need password too, frequency, date
    //   }
    default:
      return state;
  }
}