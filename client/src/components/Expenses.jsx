import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddExpense from './AddExpense.jsx';
import EditExpense from './EditExpense.jsx';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 2000,
      bills: 1700,
      expenses: [
        {
          expense: 'Buffalo Wild Wings',
          cost: 20,
          category: 'Food',
          frequency: 'Once',
          date: '10/02/18'
        },
        {
          expense: 'Netflix',
          cost: 10,
          category: 'Entertainment',
          frequency: 'Monthly',
          date: '10/05/18'
        },
        {
          expense: 'Comcast',
          cost: 50,
          category: 'Utilities',
          frequency: 'Monthly',
          date: '10/23/18'
        }
      ]
    }
  }
  
  render() {
    return (
      <div>
       Income: {this.state.income}
       Expenses: {this.state.bills}
       Remainder: {this.state.income - this.state.bills}
        <tr>
          <th>Expense</th>
          <th>Cost</th>
          <th>Category</th>
          <th>Frequency</th>
          <th>Date</th>
          <th>Edit/Delete</th>
        </tr>
        {this.state.expenses.map(expense => {
          return (
            <tr>
              <td>{expense.expense}</td>
              <td>{`$${expense.cost}`}</td>
              <td>{expense.category}</td>
              <td>{expense.frequency}</td>
              <td>{expense.date}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          )
        })}
        <AddExpense />
        <EditExpense />
      </div>
    )
  }
}

export default Expenses;