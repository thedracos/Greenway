import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createExpense } from '../redux/actions/actions';
import moment from 'moment';

import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: '',
      cost: '',
      category: '',
      frequency: '',
      date: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const newExpense = {
      userId: this.props.userId,
      expense: this.state.expense,
      cost: this.state.cost,
      category: this.state.category,
      frequency: this.state.frequency,
      date: moment(this.state.date).format('YYYY-MM-DD 00:00:00.000'),
      currentMonth: this.props.currentMonth,
      nextMonth: moment(this.props.currentMonth).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD 23:59:59.999')
    }
    if (newExpense.frequency === 'Once') {
      this.props.createExpense(newExpense);
    }
    if (newExpense.frequency === 'Monthly') {
      for (var i = 0; i < 12; i++) {
        this.props.createExpense(newExpense);
        newExpense.date = moment(newExpense.date).add(1, 'months').format('YYYY-MM-DD 00:00:00.000');
      }
    }
    if (newExpense.frequency === 'Yearly') {
      for (var i = 0; i < 2; i++) {
        this.props.createExpense(newExpense);
        newExpense.date = moment(newExpense.date).add(1, 'years').format('YYYY-MM-DD 00:00:00.000');
      }
    }
  }

  render() {
    return (
      <div>
        <div className="add-exp">Add expense:</div>
        <div className="add-exp-table">
          <form className="add-exp-form" onSubmit={this.onSubmit}>
            <span className="exp-name-cell"><input className="exp-name-field" type="text" name="expense" placeholder="  New expense"onChange={this.onChange} required/>
            </span>
            <span className="exp-cost-cell"><input className="exp-cost-field" type="number" name="cost" onChange={this.onChange} min="0.00" step="0.01" placeholder="  Cost" required/>
            </span>
            <span className="exp-cat-cell"><select className="exp-cat-field" name="category" onChange={this.onChange} required>
              <option>{'Category'}</option>
              <option>{'Rent/Mortgage'}</option>
              <option>{'Utilities'}</option>
              <option>{'Transportation'}</option>
              <option>{'Groceries'}</option>
              <option>{'Dining Out'}</option>
              <option>{'Entertainment'}</option>
              <option>{'Health/Fitness'}</option>
              <option>{'Shopping'}</option>
              <option>{'Miscellaneous'}</option></select>
            </span>
            <span className="exp-freq-cell"><select className="exp-freq-field" name="frequency" onChange={this.onChange} required>
              <option>{'Frequency'}</option>
              <option>{'Once'}</option>
              <option>{'Monthly'}</option>
              <option>{'Yearly'}</option></select>
            </span>
            <span className="exp-date-cell"><input className="exp-date-field" type="date" name="date" onChange={this.onChange} required/>
            </span>
            <span className="exp-btn-cell"><button className="add-exp-btn" type="submit">Save</button>
            </span>
          </form>
        </div>
      </div>
    )
  }
}

AddExpense.propTypes = {
  createExpense: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  userId: state.store.userInfo.userId
})

export default withRouter(connect(mapStateToProps, { createExpense })(AddExpense));