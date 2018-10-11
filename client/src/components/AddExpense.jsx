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
    if (this.state.expense.length === 0 || this.state.cost.length === 0 || this.state.category === 0 || this.state.frequency.length === 0 || this.state.date.length === 0) {
      alert('Please Complete All Forms');
    } else {
      const newExpense = {
        userId: this.props.userId,
        expense: this.state.expense,
        cost: this.state.cost,
        category: this.state.category,
        frequency: this.state.frequency,
        date: this.state.date
      }
      if (newExpense.frequency === 'Once') {
        this.props.createExpense(newExpense);
      }
      if (newExpense.frequency === 'Monthly') {
        for (var i = 0; i < 24; i++) {
          this.props.createExpense(newExpense);
          newExpense.date = moment(newExpense.date).add(1, 'months');
        }
      }
      if (newExpense.frequency === 'Yearly') {
        for (var i = 0; i < 2; i++) {
          this.props.createExpense(newExpense);
          newExpense.date = moment(newExpense.date).add(1, 'years');
        }
      }

    }
  }

  render() {
    return (
      <div className="add-exp">
        <form onSubmit={this.onSubmit}>
        <div className="add-record-header">Add expense:</div>
          <div>
            <label>Expense: </label><br />
            <input className="exp-field" type="text" name="expense" onChange={this.onChange} required/>
          </div>
          <div className="pad-exp"></div>
          <div>
            <label>Cost ($): </label><br />
            <input className="exp-field" type="number" name="cost" onChange={this.onChange} min="0.00" step="0.01" placeholder="  e.g. 1000.00" required/>
          </div>
          <div className="pad-exp"></div>
          <div>
            Category: <br/>
            <select className="exp-field" name="category" onChange={this.onChange} required>
              <option>{'Selection'}</option>
              <option>{'Rent/Mortgage'}</option>
              <option>{'Utilities'}</option>
              <option>{'Transportation'}</option>
              <option>{'Groceries'}</option>
              <option>{'Dining Out'}</option>
              <option>{'Entertainment'}</option>
              <option>{'Health/Fitness'}</option>
              <option>{'Shopping'}</option>
              <option>{'Miscellaneous'}</option>
            </select><br />
          </div>
          <div className="pad-exp"></div>
          <div>
            Frequency: <br/>
            <select className="exp-field" name="frequency" onChange={this.onChange} required>
              <option>{'Selection'}</option>
              <option>{'Once'}</option>
              <option>{'Monthly'}</option>
              <option>{'Yearly'}</option>
            </select><br />
          </div>
          <div className="pad-exp"></div>
          <div>
            <label>Date: </label><br />
            <input className="exp-field" type="date" name="date" onChange={this.onChange} required />
          </div><br />
          <button className="add-exp-btn" type="submit">Save</button>
        </form>
      </div>
    )
  }
}

AddExpense.propTypes = {
  createExpense: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  expense: state.store.expense,
  userId: state.store.userInfo.userId
})

export default withRouter(connect(mapStateToProps, { createExpense })(AddExpense));