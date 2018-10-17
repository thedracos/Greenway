import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateExpense, updateExpenses } from '../redux/actions/actions';

import moment from 'moment';

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.editExpense.id,
      expense: this.props.editExpense.expense,
      cost: this.props.editExpense.cost,
      category: this.props.editExpense.category,
      frequency: this.props.editExpense.frequency,
      date: moment(this.props.editExpense.date).format('MM/DD/YYYY')
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value}, () => {console.log(this.state)});
  }

  onSubmit(e) {
  e.preventDefault();
    const updatedExpense = {
      userId: this.props.userId,
      id: this.state.id,
      expense: this.state.expense,
      cost: this.state.cost,
      category: this.state.category,
      frequency: this.state.frequency,
      date: this.state.date
    }
    if (updatedExpense.frequency === 'Once') {
      this.props.updateExpense(updatedExpense);
      this.props.viewChangeAdd();
    }
  }

  onCancel(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to cancel changes?')) {
      this.props.viewChangeAdd();
    }
  }

  render() {
    return (
      <div>
        <h3>Edit Expense</h3>
        <form>
          <div>
            <label>Expense: </label><br />
            <input type="text" name="expense" onChange={this.onChange} defaultValue={this.props.editExpense.expense} required/>
          </div>
          <div>
            <label>Cost ($): </label><br />
            <input type="number" name="cost" onChange={this.onChange} defaultValue={this.props.editExpense.cost} min="0.00" step="0.01" required/>
          </div>
          <div>
            <label>Category: </label><br />
            <select name="category" onChange={this.onChange} defaultValue={this.props.editExpense.category} required>
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
          <div>
            <label>Frequency: </label><br />
            <select className="exp-field" name="frequency" onChange={this.onChange} defaultValue={this.props.editExpense.frequency} required>
              <option>{'Once'}</option>
              <option>{'Monthly'}</option>
              <option>{'Yearly'}</option>
            </select><br />
          </div>
          <div>
            <label>Date: </label><br />
            <input type="text" name="date" onChange={this.onChange} defaultValue={this.state.date} required/>
          </div><br />
          <button type="submit" onClick={this.onSubmit}>Save</button>
          <button type="submit" onClick={this.onCancel}>Cancel</button>
        </form>
      </div>
    )
  }
}

EditExpense.propTypes = {
  userId: PropTypes.number.isRequired,
  updateExpense: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    userId: state.store.userInfo.userId
  }
}

export default connect(mapStateToProps, { updateExpense, updateExpenses })(EditExpense);