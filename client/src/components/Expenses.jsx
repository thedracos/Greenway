import React, { Component } from 'react';
import PropTypes from 'prop-types';

//connects component to redux
import { connect } from 'react-redux';
import { fetchExpenses, fetchMonthExpenses, deleteExpense } from '../redux/actions/actions';

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
      bills: 1700,
      currentMonth : moment().format('YYYY-MM'),
      uniqueDates: []
    }
    //   
    //   // editExpense: {
    //   //   id: 5,
    //   //   expense: 'Buffalo Wild Wings',
    //   //   cost: 20,
    //   //   category: 'Food',
    //   //   frequency: 'Once',
    //   //   date: '10/02/18'
    //   // }
    // }
    this.updateExpense = this.updateExpense.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getUniqueDates = this.getUniqueDates.bind(this);
  }

  getUniqueDates(array) {
    console.log('func was called');
    let allDates = array.map((expense) => {
      return moment(expense.date).format('MMM YYYY');
    });
    let uniqueDates = uniq(allDates);
    this.setState({
      uniqueDates
    });
  }

  componentDidMount() {
    const currentMonth = this.state.currentMonth;
    const nextMonth = moment(currentMonth).add(1, 'months').calendar();
    this.props.fetchMonthExpenses(this.props.userId, currentMonth, nextMonth);
    this.props.fetchExpenses(this.props.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    if (this.state.currentMonth !== prevState.currentMonth) {
      const selectedMonth = moment(this.state.currentMonth).format('YYYY-MM');
      const followingSelectedMonth = moment(selectedMonth).add(1, 'months').calendar();
      this.props.fetchMonthExpenses(this.props.userId, selectedMonth, followingSelectedMonth);
    }
    if (this.props.expenses.length > 0 && this.state.uniqueDates.length === 0) {
      this.getUniqueDates(this.props.expenses);
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
  
  render() {
    return (
      <Router>
        <div>
          <h2>Expenses</h2>
          <label></label>
          <select name="month" onChange={this.onChange}>
            <option>Select a Month</option>
            {this.state.uniqueDates.map((date) => {
              return <option>{date}</option>
            })}
          </select>
          <h3>{moment(this.state.currentMonth).format('MMMM YYYY')}</h3>
          Income: {`$${this.props.income}`}<br />
          Expenses: {`$${this.props.monthExpenses.reduce((total, expense) => {
            return total + expense.cost;
          }, 0)}`}<br />
          Remainder: {`$${this.props.income - this.props.monthExpenses.reduce((total, expense) => {
            return total + expense.cost;
          }, 0)}`}<br /><br />
          <tr>
            <th>Expense</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Frequency</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
          {this.props.monthExpenses.map(expense => {
            return (
              <tr>
                <td>{expense.expense}</td>
                <td>{`$${expense.cost}`}</td>
                <td>{expense.category}</td>
                <td>{expense.frequency}</td>
                <td>{moment(expense.date).format('L')}</td>
                <td>
                  {/* <button onClick={() => {this.updateExpense(expense)}}>Edit</button> */}
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
  fetchMonthExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  monthExpenses: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired
  //expense: PropTypes.object.isRequired
}

//Similar to setState within this component, grabs contents in store
//and defines our state to the data we want to use
const mapStateToProps = state => {
  return {
    monthExpenses: state.store.monthExpenses,
    expenses: state.store.expenses,
    userId: state.store.userInfo.userId,
    income: state.store.userInfo.income
    //expense: state.store.expense
  }
};

//https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(connect(mapStateToProps, { fetchExpenses, fetchMonthExpenses, deleteExpense })(Expenses));