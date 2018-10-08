import React, { Component } from 'react';
import PropTypes from 'prop-types';

//connects component to redux
import { connect } from 'react-redux';
import { fetchCurrentMonthExpenses, deleteExpense } from '../redux/actions/actions';

//React Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import moment from 'moment';
import { uniq } from 'underscore';

import AddExpense from './AddExpense.jsx';
import EditExpense from './EditExpense.jsx';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 2000,
      bills: 1700,
      editExpense: {
        id: 5,
        expense: 'Buffalo Wild Wings',
        cost: 20,
        category: 'Food',
        frequency: 'Once',
        date: '10/02/18'
      }
    }
    this.updateExpense = this.updateExpense.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  componentWillMount() {
    const currentMonth = moment().format('YYYY-MM');
    this.props.fetchCurrentMonthExpenses(this.props.userId, currentMonth);
  }

  componentDidUpdate() {
    console.log(this.state.currentMonth);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expense) {
      this.props.expenses.push(nextProps.expense);
    }
  }

  updateExpense(expense) {
    console.log(expense);
    const editExpense = {
      id: expense.id,
      expense: expense.expense,
      cost: expense.cost,
      category: expense.category,
      frequency: expense.frequency,
      date: expense.date
    }
    this.setState({
      editExpense: editExpense
    })
  }
  
  onChange(e) {
    this.setState({
      currentMonth: e.target.value
    })
  }


  //convert the dates into month year
  //get unique values 
  //
  
  render() {
    return (
      <Router>
        <div>
          <h2>Expenses</h2>
          <label></label>
          <select name="month" onChange={this.onChange}>
            {uniq(this.props.expenses.map(expense => {
              return (<option>{moment(expense.date).format('MMM YYYY')}</option>)
            }))}
          </select>
          <h3>{moment(this.state.currentMonth).format('MMMM YYYY')}</h3>
          Income: {this.state.income}<br />
          Expenses: {this.state.bills}<br />
          Remainder: {this.state.income - this.state.bills}<br /><br />
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
                <td>{moment(expense.date).format('MMM YYYY')}</td>
                <td>
                  <button onClick={() => {this.updateExpense(expense)}}>Edit</button>
                  <button onClick={() => {this.props.deleteExpense(expense)}}>Delete</button>
                </td>
              </tr>
            )
          })}
          <AddExpense />
          {/* <EditExpense editExpense={this.state.editExpense}/> */}
        </div>
      </Router>
    )
  }
}

Expenses.propTypes = {
  fetchCurrentMonthExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired
  //expense: PropTypes.object.isRequired
}

//Similar to setState within this component, grabs contents in store
//and defines our state to the data we want to use
const mapStateToProps = state => {
  console.log(state)
  return {
    expenses: state.store.expenses,
    userId: state.store.userInfo.userId
    //expense: state.store.expense
  }
};

//https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(connect(mapStateToProps, { fetchCurrentMonthExpenses, deleteExpense })(Expenses));