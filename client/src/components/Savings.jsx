import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchSavings } from '../redux/actions/actions';

import AddSaving from './AddSaving.jsx';

class Savings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 200
    }
  }

  componentDidMount() {
    this.props.fetchSavings(this.props.userId);
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
                  <input type="text" name= {item.id}/>
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

export default connect(mapStateToProps, { fetchSavings })(Savings);