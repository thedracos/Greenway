import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchSavings, fetchMonthSavings, editSavings } from '../redux/actions/actions';

import moment from 'moment';
import { uniq, sortBy } from 'underscore';

import AddSaving from './AddSaving.jsx';
import SavingsChart from './SavingsChart.js';

class Savings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth : moment().format('YYYY-MM-01 00:00:00.000'),
      uniqueDates: [],
      remaining: 200
    }
    this.updateSavings = this.updateSavings.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getUniqueDates = this.getUniqueDates.bind(this);
  }

  getUniqueDates(array) {
    let allDates = array.map((expense) => {
      return expense.current_date.slice(0, 7);
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
    this.props.fetchMonthSavings(this.props.userId, currentMonth, nextMonth);
    this.props.fetchSavings(this.props.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentMonth !== prevState.currentMonth) {
      const selectedMonth = moment(this.state.currentMonth).format('YYYY-MM-01 00:00:00.000');
      const followingSelectedMonth = moment(selectedMonth).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD 23:59:59.999');
      console.log('selectedMonth', selectedMonth , 'followingSelectedMonth', followingSelectedMonth);
      this.props.fetchMonthSavings(this.props.userId, selectedMonth, followingSelectedMonth);
    }
    if (this.props.savings.length > 0 && this.state.uniqueDates.length === 0) {
      this.getUniqueDates(this.props.savings);
    }
    if (prevProps.monthSavings !== this.props.monthSavings) {
      this.props.fetchSavings(this.props.userId);
    }
  }

  updateSavings(savingItem) {
    const cost = savingItem.cost - Number(this.state.editedItem);
    const editedItem = {
      userId: this.props.userId,
      item: savingItem.item,
      cost: cost,
      current_date: savingItem.current_date,
      end_date: savingItem.end_date,
      currentMonth: this.state.currentMonth,
      nextMonth: moment(this.state.currentMonth).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD 23:59:59.999')
    }
    console.log('editedItem yo', editedItem);
    this.props.editSavings(editedItem);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="savings-body">
        <div className="component-title">Savings</div>

        <div className="savings-dash">
          <div className="sav-dash-left">
            <h3 className="exp-month">{moment(this.state.currentMonth).format('MMMM YYYY')}</h3>
            <select className="exp-month-select" name="currentMonth" onChange={this.onChange}>
              <option>Select a month</option>
              {this.state.uniqueDates.map((date) => {
                return <option>{date}</option>
              })}
            </select>
            <div className="savings-total">Total remaining: {`$${this.state.remaining}`}</div>
          </div>
          <div className="sav-dash-right">
            <SavingsChart />
          </div>
        </div>

        <div className="goals-table">
          <div className="save-row">
          <tr className="savings-row">
            <th className="gray savings-goal title-center">Goal</th>
            <th className="gray savings-rem title-left">Remaining</th>
            <th className="gray savings-save title-left">Amount saved today ($)</th>
            <th className="gray savings-start">Start date</th>
            <th className="gray savings-end">Goal date</th>
            <th className="gray savings-btn-cell"> </th>
          </tr>
          </div>
          {this.props.monthSavings.map(item => {
            return (
              <div className="save-row">
              <tr className="savings-row">
                <td className="savings-goal">{item.item}</td>
                <td className="savings-rem">{`$${item.cost}`}</td>
                <td className="savings-save-form">
                  <form>
                    <input className="savings-entry" type="number" name="editedItem" onChange={this.onChange} />
                  </form>
                </td>
                <td className="savings-start">{moment(item.start_date.slice(0, 10)).format('L')}</td>
                <td className="savings-end">{moment(item.end_date.slice(0, 10)).format('L')}</td>
                <td className="savings-btn-cell"><button class="savings-btn" type="submit" onClick={()=> {this.updateSavings(item)}}>Save!</button></td>
              </tr>
              </div>
            )
          })}
        </div>

        <div className="savings-bottom"></div>
        <AddSaving currentMonth={this.state.currentMonth}/>
      </div>
    )
  }
}

Savings.propTypes = {
  fetchMonthSavings: PropTypes.func.isRequired,
  savings: PropTypes.array.isRequired,
  fetchSavings: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    monthSavings: state.store.monthSavings,
    savings: state.store.savings,
    userId: state.store.userInfo.userId
  }
}

export default connect(mapStateToProps, { fetchSavings, fetchMonthSavings, editSavings })(Savings);