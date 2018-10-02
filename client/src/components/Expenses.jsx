import React, { Component } from 'react';
import PropTypes from 'prop-types';

//connects component to redux
import { connect } from 'react-redux';
import { fetchExpenses } from '../redux/actions/postActions.js';

import AddExpense from './AddExpense.jsx';
import EditExpense from './EditExpense.jsx';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 2000,
      bills: 1700,
    }
    this.onDelete = this.onDelete.bind(this);
  }
  
  componentWillMount() {
    this.props.fetchExpenses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expense) {
      this.props.expenses.push(nextProps.expense);
    }
  }

  onDelete(expense) {
    console.log(expense);
    fetch('/deleteExpense', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(expense)
    })
    .then(res => res.text())
    .then(data => console.log(data));
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
        {this.props.expenses.map(expense => {
          return (
            <tr>
              <td>{expense.expense}</td>
              <td>{`$${expense.cost}`}</td>
              <td>{expense.category}</td>
              <td>{expense.frequency}</td>
              <td>{expense.date}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => {this.onDelete(expense)}}>Delete</button>
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

Expenses.propTypes = {
  fetchExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  expense: PropTypes.object.isRequired
}

//Similar to setState within this component, grabs contents in store
//and defines our state to the data we want to use
const mapStateToProps = state => {
  //console.log(state);
  return {
  expenses: state.expenses.expenses,
  expense: state.expenses.expense
}};

//mapdispatchtoprops
export default connect(mapStateToProps, { fetchExpenses })(Expenses);