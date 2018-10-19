import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSavings } from '../redux/actions/actions';

import moment from 'moment';

class AddSaving extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    let savingsItem = {
      userId: this.props.userId,
      item: this.state.item,
      cost: Number(this.state.cost),
      start_date: moment(this.state.startDate).format('YYYY-MM-DD 00:00:00.000'),
      current_date: moment(this.state.startDate).format('YYYY-MM-DD 00:00:00.000'),
      end_date: moment(this.state.endDate).format('YYYY-MM-DD 00:00:00.000'),
      currentMonth: this.props.currentMonth,
      nextMonth: moment(this.props.currentMonth).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD 23:59:59.999')
    }
    //POST 1st Month
    this.props.createSavings(savingsItem);
    //POST Last Month
    savingsItem.current_date = moment(this.state.endDate).format('YYYY-MM-DD 00:00:00.000');
    this.props.createSavings(savingsItem);
    //POST InBetween Months
    const dateDifference = Math.floor(moment(this.state.endDate).diff(moment(this.state.startDate), 'months', true));
    for (var i = 1; i < dateDifference; i++) {
      savingsItem.current_date = moment(this.state.startDate).add(i, 'months').format('YYYY-MM-01 00:00:00.000');
      this.props.createSavings(savingsItem);
    }
  }

  render() {
    return (
      <div className="add-exp-table">
        <form className="add-exp-form" onSubmit={this.onSubmit}>
        <div className="add-record-header">Add goal:</div>
          <span className="savings-goal pad-exp">
            <input className="input-250" placeholder="  New saving goal" type="text" name="item" onChange={this.onChange} required/>
          </span>
          <span className="savings-rem pad-exp">
            <input className="input-140" type="number" name="cost" onChange={this.onChange} min="0.00" step="0.01" placeholder="  Cost ($)" required/>
          </span>
          <span className="savings-save top-push pad-exp">
            <input className="input-220 top-pushed" type="number" name="cost" onChange={this.onChange} min="0.00" step="0.01" placeholder="  Initial saving ($)" required/>
          </span>
          <span className="savings-start marg-bump pad-exp">
            <input className="input-save-date" type="date" name="startDate" onChange={this.onChange} required />
          </span>
          <span className="savings-end marg-bump pad-exp">
            <input className="input-save-date" type="date" name="endDate" onChange={this.onChange} required />
          </span>
          <span>
          <button className="add-save-btn" type="submit">Save</button>
          </span>
        </form>
      </div>
    )
  }
}

AddSaving.propTypes = {
  createSavings: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  userId: state.store.userInfo.userId
})

export default connect(mapStateToProps, { createSavings })(AddSaving);