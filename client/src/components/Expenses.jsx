import React, { Component } from 'react';
import PropTypes from 'prop-types';

//connects component to redux
import { connect } from 'react-redux';
import { fetchExpenses, fetchMonthExpenses, deleteExpense } from '../redux/actions/actions';

//React Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import moment from 'moment';
import { uniq, sortBy } from 'underscore';

import AddExpense from './AddExpense.jsx';
import EditExpense from './EditExpense.jsx';
import ExpensesChart from './ExpensesChart.js';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth : moment().format('YYYY-MM-01 00:00:00.000'),
      uniqueDates: [],
      view: '',
      editExpense: {}
    }
    this.updateExpense = this.updateExpense.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getUniqueDates = this.getUniqueDates.bind(this);
    this.viewChanger = this.viewChanger.bind(this);
    this.viewChangeAdd = this.viewChangeAdd.bind(this);
    this.renderDeleteOrUnsubscribe = this.renderDeleteOrUnsubscribe.bind(this);
  }

  getUniqueDates(array) {
    let allDates = array.map((expense) => {
      return expense.date.slice(0, 7);
    });
    let uniqueDates = uniq(allDates);
    let sortedDates = sortBy(uniqueDates);
    let dropdownDates = sortedDates.map((date) => {
      return moment(date).format('MMM YYYY');
    })
    this.setState({
      uniqueDates: dropdownDates
    });
  }

  componentDidMount() {
    const currentMonth = this.state.currentMonth;
    const nextMonth = moment(currentMonth).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD 23:59:59.999');
    this.props.fetchMonthExpenses(this.props.userId, currentMonth, nextMonth);
    this.props.fetchExpenses(this.props.userId);
    this.setState({
      view: 'add'
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentMonth !== prevState.currentMonth) {
      const selectedMonth = moment(this.state.currentMonth).format('YYYY-MM-01 00:00:00.000');
      const followingSelectedMonth = moment(selectedMonth).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD 23:59:59.999');
      this.props.fetchMonthExpenses(this.props.userId, selectedMonth, followingSelectedMonth);
    }
    if (this.props.expenses.length > 0 && this.state.uniqueDates.length === 0) {
      this.getUniqueDates(this.props.expenses);
    }
  }

  updateExpense(expense) {
    console.log('this is expense', expense);
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
    this.setState({
      view: 'edit'
    })
  }

  onChange(e) {
    this.setState({
      currentMonth: e.target.value
    })
  }

  viewChanger() {
    if (this.state.view === 'add') {
      return (<AddExpense />)
    }
    if (this.state.view === 'edit') {
      return (<EditExpense editExpense={this.state.editExpense} viewChangeAdd={this.viewChangeAdd}/>)
    }
  }

  viewChangeAdd() {
    this.setState({
      view: 'add'
    })
  }

  renderDeleteOrUnsubscribe(expense) {
    if (expense.frequency === 'Once') {
      return 'Delete';
    } else {
      return 'Unsubscribe';
    }
  }

  render() {
    return (
      <Router>
        <div>
          <div className="expenses-title">Expenses</div>
          <label></label>
          <select className="exp-month-select" name="month" onChange={this.onChange}>
            <option>Select a Month</option>
            {this.state.uniqueDates.map((date) => {
              return <option>{date}</option>
            })}
          </select>
          <h3 className="exp-month">{moment(this.state.currentMonth).format('MMMM YYYY')}</h3>
          <div className="exp-nums">
          Income: {`$${this.props.income}`}<br />
          Expenses: {`$${this.props.monthExpenses.reduce((total, expense) => {
            return total + expense.cost;
          }, 0)}`}<br />
          Remainder: {`$${this.props.income - this.props.monthExpenses.reduce((total, expense) => {
            return total + expense.cost;
          }, 0)}`}<br />
          <button>Convert Remaining to Savings!</button>
          </div>
          <tr>
            <th className="gray exp-name exp-center">Expense</th>
            <th className="gray exp-10 exp-center">Cost</th>
            <th className="gray exp-width exp-center">Category</th>
            <th className="gray exp-10 exp-center">Frequency</th>
            <th className="gray exp-10 exp-center">Date</th>
            <th className="gray exp-width exp-center"> </th>
          </tr>
          {this.props.monthExpenses.map(expense => {
            return (
              <tr>
                <td className="exp-name">{expense.expense}</td>
                <td className="exp-10">{`$${expense.cost}`}</td>
                <td className="gray exp-width">{expense.category}</td>
                <td className="gray exp-10 ">{expense.frequency}</td>
                <td className="exp-10">{moment(expense.date).format('L')}</td>
                <td className="exp-del-btn exp-width">
                  <button onClick={() => {this.updateExpense(expense)}}>Edit</button>
                  <button onClick={() => {this.props.deleteExpense(expense)}}>{this.renderDeleteOrUnsubscribe(expense)}</button>
                </td>
              </tr>
            )
          })}
          <div>
            {this.viewChanger()}
          </div>
          <div>
            <ExpensesChart />
          </div>
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
    income: state.store.userInfo.income,
    //expense: state.store.expense
  }
};

//https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(connect(mapStateToProps, { fetchExpenses, fetchMonthExpenses, deleteExpense })(Expenses));