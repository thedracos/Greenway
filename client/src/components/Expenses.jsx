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
      bills: 1700,
      currentMonth : moment().format('YYYY-MM')
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
  }
  
  componentDidMount() {
    const currentMonth = this.state.currentMonth;
    const nextMonth = moment(currentMonth).add(1, 'months').calendar();
    this.props.fetchCurrentMonthExpenses(this.props.userId, currentMonth, nextMonth);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentMonth !== prevState.currentMonth) {
      const selectedMonth = moment(this.state.currentMonth).format('YYYY-MM');
      const followingSelectedMonth = moment(selectedMonth).add(1, 'months').calendar();
      this.props.fetchCurrentMonthExpenses(this.props.userId, selectedMonth, followingSelectedMonth);
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
            <option>{moment('2018-09-09 07:00:00 +0000').format('MMM YYYY')}</option>
            <option>{moment('2018-10-09 07:00:00 +0000').format('MMM YYYY')}</option>
            <option>{moment('2018-11-09 07:00:00 +0000').format('MMM YYYY')}</option>
            <option>{moment('2018-12-09 07:00:00 +0000').format('MMM YYYY')}</option>
            {/* {uniq(this.props.expenses.map(expense => {
              return (<option>{moment(expense.date).format('MMM YYYY')}</option>)
            }))} */}
          </select>
          <h3>{moment(this.state.currentMonth).format('MMMM YYYY')}</h3>
          Income: {`$${this.props.income}`}<br />
          Expenses: {this.state.bills}<br />
          Remainder: {this.props.income - this.state.bills}<br /><br />
          <tr>
            <th>Expense</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Frequency</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
          {this.props.expenses.map(expense => {
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
  fetchCurrentMonthExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired
  //expense: PropTypes.object.isRequired
}

//Similar to setState within this component, grabs contents in store
//and defines our state to the data we want to use
const mapStateToProps = state => {
  return {
    expenses: state.store.expenses,
    userId: state.store.userInfo.userId,
    income: state.store.userInfo.income
    //expense: state.store.expense
  }
};

//https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(connect(mapStateToProps, { fetchCurrentMonthExpenses, deleteExpense })(Expenses));