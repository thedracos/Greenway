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
      date: this.state.date,
      currentMonth: this.props.currentMonth,
      nextMonth: moment(this.props.currentMonth).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD 23:59:59.999')
    }
    if (updatedExpense.frequency === 'Once') {
      this.props.updateExpense(updatedExpense);
      this.props.viewChangeAdd();
    } else {
      this.props.updateExpense(updatedExpense);
      // if (confirm('Would you like to update your changes for all items in this subscription?')) {
      //   console.log('ok making changes');
      // } else {
      //   this.props.updateExpense(updatedExpense);
      // }
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
        <div className="add-exp">Edit expense:</div>
        <div className="add-exp-table">
          <form className="add-exp-form">
            <span>
              <input className="exp-name-edit" type="text" name="expense" onChange={this.onChange} defaultValue={this.props.editExpense.expense} required/>
            </span>
            <span>
              <input className="exp-cost-edit" type="number" name="cost" onChange={this.onChange} defaultValue={this.props.editExpense.cost} min="0.00" step="0.01" required/>
            </span>
            <span>
              <select className="exp-cat-edit" name="category" onChange={this.onChange} defaultValue={this.props.editExpense.category} required>
                <option>{'Rent/Mortgage'}</option>
                <option>{'Utilities'}</option>
                <option>{'Transportation'}</option>
                <option>{'Groceries'}</option>
                <option>{'Dining Out'}</option>
                <option>{'Entertainment'}</option>
                <option>{'Health/Fitness'}</option>
                <option>{'Shopping'}</option>
                <option>{'Miscellaneous'}</option>
              </select>
            </span>
            <span>
              <select className="exp-freq-edit" name="frequency" onChange={this.onChange} defaultValue={this.props.editExpense.frequency} required>
                <option>{'Once'}</option>
                <option>{'Monthly'}</option>
                <option>{'Yearly'}</option>
              </select>
            </span>
            <span>
              <input className="exp-date-edit" type="text" name="date" onChange={this.onChange} defaultValue={this.state.date} required/>
            </span>
            <span>
              <button className="edit-exp-save-btn" type="submit" onClick={this.onSubmit}>Save</button>
              <button className="edit-exp-cancel-btn" type="submit" onClick={this.onCancel}>Cancel</button>
            </span>
          </form>
        </div>
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