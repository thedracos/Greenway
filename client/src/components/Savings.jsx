import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchSavings, editSavings } from '../redux/actions/actions';

import AddSaving from './AddSaving.jsx';

class Savings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 200
    }
    this.updateSavings = this.updateSavings.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchSavings(this.props.userId);
  }

  updateSavings(savingItem) {
    const cost = savingItem.cost - this.state.editedItem;
    const editedItem = {
      userId: this.props.userId,
      item: savingItem.item,
      cost: cost
    }
    console.log(editedItem);
    this.props.editSavings(editedItem);
  }

  onChange(e) {
    console.log('this is e.target.name', e.target.name);
    console.log('this is e.target.value', e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="savings-title">Savings</div>
        <div className="savings-total">Total Remaining: {`$${this.state.remaining}`}< br/>
        < br/></div>
        <tr>
          <th className="gray savings-head">Goal</th>
          <th className="gray savings-head">Remaining</th>
          <th className="gray savings-head">Amount Saving ($)</th>
          <th className="gray savings-head">Months Remaining</th>
          <th className="gray savings-head"></th>
        </tr>
        {this.props.savings.map(item => {
          return (
            <tr>
              <td className="savings-chart">{item.item}</td>
              <td className="savings-head">{`$${item.cost}`}</td>
              <td className="savings-chart gray">
                <form className="saving-amount">
                  <label></label>
                  <input type="number" name="editedItem" onChange={this.onChange} />
                </form>
              </td>
              <td className="savings-chart gray">{item.cost / 19}</td>
              <td className="savings-chart"><button class="savings-btn" type="submit">Save!</button></td>
            </tr>
          )
        })}
        <div className="savings-bottom"></div>
        <AddSaving />
      </div>
    )
  }
}

Savings.propTypes = {
  savings: PropTypes.array.isRequired,
  fetchSavings: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    savings: state.store.savings,
    userId: state.store.userInfo.userId
  }
}

export default connect(mapStateToProps, { fetchSavings, editSavings })(Savings);